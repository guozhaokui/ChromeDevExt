
module WebInspector {
    /**
     * @constructor
     * @param {string} name
     * @param {V} defaultValue
     * @param {!WebInspector.Object} eventSupport
     * @param {?Storage} storage
     * @template V
     */
    class Setting {
        _name:string;
        _defaultValue:any;
        _eventSupport:WebInspector.Object;
        _storage:Storage;
        
        constructor(name:string, defaultValue:any, eventSupport:WebInspector.Object, storage:Storage) {
            this._name = name;
            this._defaultValue = defaultValue;
            this._eventSupport = eventSupport;
            this._storage = storage;
        }
    }

    class Settings {
        /**
         * @type {!Object.<string, !WebInspector.Setting>}
         */
        _registry: Object;
        _eventSupport:any;
        /**
         * @param {string} key
         * @param {*} defaultValue
         * @return {!WebInspector.Setting}
         */
        createSetting(key: string, defaultValue: any): Settings {
            if (!this._registry[key])
                this._registry[key] = new Setting(key, defaultValue, this._eventSupport, window.localStorage);
            return this._registry[key];
        }
    }
}