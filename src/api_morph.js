import html_processor from "./func_html.js";
import component_processor from "./func_component.js";

var metamorphosis = {
	html: function(api) {
		api.defaultProcessor = html_processor();
		api.addHook("add", function(tags, template) {
			api.getRules(template || "mainstream").push(tags);
			return true;
		});

        return api;
	},
	component: function(api) {
		api.defaultProcessor = component_processor();
		api.addHook("add", function(component) {
			if(!(component instanceof Array)) component = [component];
			for(var i=0; i<component.length, c = component[i]; i++) {
				api.getRules("mainstream").push(c);
			}
			return true;
		});	

        return api;
	},
	jsonify: function(api) {
		api.jsonify = true;
	},
	'dynamic-css': function(api) {
		api.dynamicCSS = true;
	}
}

export default function(api) {
	return function(type) {
		if(metamorphosis[type]) {
			api.flush();
			metamorphosis[type](api);
		}
		return api;
	}
}
