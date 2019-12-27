import html_processor from "./func_html.js";

var metamorphosis = {
	html: function(api) {
		api.defaultProcessor = html_processor();
		api.addHook("add", function(tags, template) {
			api.getRules(template || "mainstream").push(tags);
			return true;
		});

        return api;
	},
	jsonify: function(api) {
		api.jsonify = true;
	}
};

export default function(api) {
	return function(type) {
		if(metamorphosis[type]) {
			api.flush();
			metamorphosis[type](api);
		}
		return api;
	};
}
