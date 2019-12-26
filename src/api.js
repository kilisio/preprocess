import add_method from "./api_add.js";
import morph_method from "./morph_add.js";
import compile_method from "./compile_add.js";

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

    _api.add = function(){
        if(_api.callHooks('add', arguments)){
            return _api;
        }
        return add_method(_api).apply(_api, arguments);
    };

    _api.morph = function(){
        if(_api.callHooks('morph', arguments)){
            return _api;
        }
        return morph_method(_api).apply(_api, arguments);
    };

    _api.compile = function(){
        if(_api.callHooks('compile', arguments)){
            return _api;
        }
        return compile_method(_api).apply(_api, arguments);
    };

	_api.flush = function() {
		_rules = {};
		_storage = {};
		_hooks = {};
        _api.add = function(){
            if(_api.callHooks('add', arguments)){
                return _api;
            }
            return add_method(_api).apply(_api, arguments);
        };
        _api.morph = function(){
            if(_api.callHooks('morph', arguments)){
                return _api;
            }
            return morph_method(_api).apply(_api, arguments);
        };
        _api.compile = function(){
            if(_api.callHooks('compile', arguments)){
                return _api;
            }
            return compile_method(_api).apply(_api, arguments);
        };
		return _api;
	};

	return _api;

}
