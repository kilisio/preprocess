var fs = require('fs');

export default function() {

	var _api = {},
		_rules = {},
		_storage = {},
		_plugins = {},
		_hooks = {};

	_api.getRules = function(stylesheet) {
		if(typeof stylesheet === 'undefined') {
			return _rules;
		} else {
			if(typeof _rules[stylesheet] === 'undefined') {
				_rules[stylesheet] = [];
			}
			return _rules[stylesheet];
		}
	};

	_api.getPlugins = function() {
		return _plugins;		
	};

	_api.getStorage = function() {
		return _storage;
	};

	_api.flush = function() {
		_rules = {};
		_storage = {};
		_hooks = {};
		_api.defaultProcessor = require(__dirname + "/processors/css/CSS.js")();
		registerAPIMethods();
		return _api;
	};

	// hooks
	_api.addHook = function(method, callback) {
		if(!_hooks[method]){
            _hooks[method] = [];
        }
		var isAlreadyAdded = false;
		for(var i=0; i<_hooks[method].length; i++) {
            let c=_hooks[method][i];
			if(c === callback) {
				isAlreadyAdded = true;
			}
		}
		if(isAlreadyAdded === false){ 
            isAlreadyAdded = _hooks[method].push(callback);
        }else{ 
            isAlreadyAdded = null;
        }
	};

	_api.callHooks = function(method, args) {
		if(_hooks[method]) {
			for(var i=0; i<_hooks[method].length; i++) {
                let c=_hooks[method][i];
				if(c.apply(_api, args) === true){ 
                    return true;
                }
			}
		}
		return false;
	};

	// internal variables
	_api.numOfAddedRules = 0;
	_api.defaultProcessor = require(__dirname + "/processors/css/CSS.js")();

	var registerAPIMethods = function() {
		if(fs.existsSync(__dirname + "/api")) {
			var methods = fs.readdirSync(__dirname + "/api");
			for(var i=0; i<methods.length; i++) {
				var file = methods[i];
				_api[file.replace(".js", "")] = (function(file) {
					return function() {
						var f = require(__dirname + "/api/" + file)(_api);
						if(_api.callHooks(file.replace(".js", ""), arguments)) return _api;
						return f.apply(_api, arguments);
					}
				})(file);			
			}
		}
	}

	registerAPIMethods();

	return _api;

}
