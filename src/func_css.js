import transformUppercase from "./func_transform.js";
import temp_eng from "./func_template.js";

var newline = '\n',
	defaultOptions = {
		combineSelectors: true,
		minify: false,
		keepCamelCase: false
	};

var toCSS = function(rules, options, indent) {
	var css = '';
	indent = indent || ['', '  '];
	for(let selector in rules) {
		// handling raw content
		if(selector.indexOf("____raw") === 0) {
			css += rules[selector][selector] + newline;
		// handling normal styles
		} else {
			var entityStyle = indent[0] + selector.replace(/~~(.+)~~/, '').replace(/^%.*?%/, '') + ' {' + newline;
			var entity = '';
			for(let prop in rules[selector]) {
				var value = rules[selector][prop];
				if(value === "") {
					value = '""';
				}
				prop = prop.replace(/~~(.+)~~/, '').replace(/^%.*?%/, '');
				if(options && options.keepCamelCase === true) {
					entity += indent[1] + prop + ': ' + value + ';' + newline;
				} else {
					entity += indent[1] + transformUppercase(prop) + ': ' + value + ';' + newline;
				}
			}
			if(entity !== '') {
				entityStyle += entity;
				entityStyle += indent[0] + '}' + newline;
				css += entityStyle;
			}
		}
	}
	return css;
};

var toJSON = function(rules) {
	var result = {};
	for(let stylesheet in rules) {
		var styles = rules[stylesheet];
		if(stylesheet === 'mainstream') {
			for(let selector in styles) {
				result[selector] = {};
				for(let prop in styles[selector]) {
					result[selector][prop] = styles[selector][prop];
				}
			}			
		} else if(stylesheet.indexOf('@media') >= 0) {
			result[stylesheet] = {};
			for(let selector in styles) {
				result[stylesheet][selector] = {};
				for(let prop in styles[selector]) {
					result[stylesheet][selector][prop] = styles[selector][prop];
				}
			}
		}
	}
	return result;
};

// combining selectors
var combineSelectors = function(rules, prevent_combining) {

	var map = [], arr = {};
	var preventCombining = [].concat(prevent_combining || []);
	preventCombining.splice(0, 0, '');
	preventCombining = preventCombining.join('|');

	// extracting every property
	for(let selector in rules) {
		var props = rules[selector];
		for(let prop in props) {
			map.push({
				selector: selector, 
				prop: prop, 
				value: props[prop], 
				combine: preventCombining.indexOf('|' + prop) < 0 && selector.indexOf('@font-face') < 0
			});
		}
	}

	// combining
	for(let i=0; i<map.length; i++) {
		if(map[i].combine === true && map[i].selector !== false) {
			for(let j=i+1;j<map.length; j++) {
				if(map[i].prop === map[j].prop && map[i].value === map[j].value) {
					map[i].selector += ', ' + map[j].selector.replace(/~~(.+)~~/, '').replace(/^%.*?%/, '');
					map[j].selector = false; // marking for removal
				}
			}
		}
	}

	// preparing the result
	for(let i=0; i<map.length; i++) {
		if(map[i].selector !== false) {
			if(!arr[map[i].selector]) { arr[map[i].selector] = {}; }
			arr[map[i].selector][map[i].prop] = map[i].value;
		}
	}
	
	return arr;
};

var minimize = function(content) {
    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    // now all comments, newlines and tabs have been removed
    content = content.replace( / {2,}/g, ' ' );
    // now there are no more than single adjacent spaces left
    // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
    content = content.replace( / ([{:}]) /g, '$1' );
    content = content.replace( /([;,]) /g, '$1' );
    content = content.replace( / !/g, '!' );
    return content;
};

var replaceDefined = function(css, options) {
	if(options && options.api && options.api.getStorage().__defined) {
		var storage = options.api.getStorage().__defined;
		for(let prop in storage) {
			var re = new RegExp('<%( )?' + prop + '( )?%>', 'g');
			if(typeof storage[prop] !== 'function') {
				css = css.replace(re, storage[prop]);
			} else {
				css = css.replace(re, storage[prop]());
			}
		}
	}
	return css;
};

export default function() {
	var processor = function(rules, callback, options) {
		options = options || defaultOptions;
		if(options.api && options.api.jsonify) {
			var json = toJSON(rules, options);
			callback(null, json);
			return json;
		}
		var css = '';
		for(let stylesheet in rules) {
			var r = rules[stylesheet];
			r = options.combineSelectors ? combineSelectors(r, options.preventCombining) : r;
			if(stylesheet === "mainstream") {
				css += toCSS(r, options);
			} else {
				css += stylesheet + " {" + newline + toCSS(r, options, ['  ', '    ']) + "}" + newline;
			}		
		}
		css = replaceDefined(css, options);
		// Dynamic CSS
		if(options && options.api && options.api.dynamicCSS) {
			css = temp_eng(css, options);
		}
		// Minification
		if(options.minify) {
			css = minimize(css);
			if(callback) { callback(null, css); }
		} else {
			if(callback) { callback(null, css); }
		}
		return css;
	};
	processor.type = "css";
	return processor;
}
