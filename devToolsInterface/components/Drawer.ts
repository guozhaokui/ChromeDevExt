
module WebInspector {
   	export class Drawer extends VBox {
        _tabbedPane:TabbedPane;
        _lastSelectedViewSetting:any;
        constructor(splitView: any) {
            super();
            //this._lastSelectedViewSetting = WebInspector.settings.createSetting("WebInspector.Drawer.lastSelectedView", "console");
        }	
        
        /**
         * @param {string} id
         */
        closeView(id:string) {
            //this._tabbedPane.closeTab(id);
        }

        /**
         * @param {string} id
         * @param {boolean=} immediate
         */
        showView(id:string, immediate:boolean) {
            if (!this._tabbedPane.hasTab(id)) {
                // Hidden tab.
                this._innerShow(immediate);
                return;
            }
            this._innerShow(immediate);
            this._tabbedPane.selectTab(id, true);
            // In case this id is already selected, anyways persist it as the last saved value.
            this._lastSelectedViewSetting.set(id);
        }
        
        /**
         * @param {boolean=} immediate
         */
        _innerShow(immediate){
            /*
            if (this.isShowing())
                return;

            this._splitView.showBoth(!immediate);

            if (this._visibleView())
                this._visibleView().focus();
             */
        }        
    }
}