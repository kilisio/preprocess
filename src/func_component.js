import css_processor from "./func_css.js";
import html_processor from "./func_html.js";

var compileComponent = function(input, callback, options) {

	var css = "", 
		html = "", 
		all = [],
		api = options.api,
		cssPreprocessor = css_processor(),
		htmlPreprocessor = html_processor();

	var processCSS = function(clb) {
		for(let i=0; i<all.length ; i++) {
            let component=all[i];
			if(typeof component === "function") { component = component(); }
			api.add(component.css ? component.css : {});
		}
		cssPreprocessor(api.getRules(), function(err, result) {
			css += result;
			clb(err);
		}, options);
	};
	var processHTML = function(clb) {
		var index = 0;
		var error = null;
		var processComponent = function() {
			if(index > input.length-1) {
				clb(error);
				return;
			}
			var c = input[index];
			if(typeof c === "function") { c = c(); }
			api.morph("html").add(c.html ? c.html : {});
			htmlPreprocessor(api.getRules(), function(err, result) {
				html += result;
				index += 1;
				error = err;
				processComponent();
			}, options);
		};
		processComponent();
	};
	var checkForNesting = function(o) {
		for(let key in o) {
			if(key === "_include") {
				if(o[key] instanceof Array) {
					for(let i=0; i<o[key].length ; i++) {
                        let c=o[key][i];
						if(typeof c === "function") { c = c(); }
						all.push(c);
						checkForNesting(c);
					}
				} else {
					if(typeof o[key] === "function") { o[key] = o[key](); }
					all.push(o[key]);
					checkForNesting(o[key]);
				}
			} else if(typeof o[key] === "object") {
				checkForNesting(o[key]);
			}
		}
	};

	// Checking for nesting. I.e. collecting the css and html.
	for(let i=0; i<input.length ; i++) {
        let c=input[i];
		if(typeof c === "function") { c = c(); }
		all.push(c);
		checkForNesting(c);
	}

	api.flush();
	processCSS(function(errCSS) {
		api.morph("html");
		processHTML(function(errHTML) {
			callback(
				errCSS || errHTML ? {error: {css: errCSS, html: errHTML }} : null,
				css,
				html
			);
		});
	});
	
};

export default function() {
	let processor = function(rules, callback, options) {
		compileComponent(rules.mainstream, callback, options);
	};
	processor.type = "component";
	return processor;
}
