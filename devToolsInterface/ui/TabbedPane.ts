
module WebInspector{
    export class TabbedPane extends VBox {
        _tabs: any;
        _tabsById: Object;	//实际当map来用(string,TabbedPaneTab)
        constructor() {
            super();
        }
		/*
			鼠标在当前tab上downl了。
			这个会调用到 selectTab
		*/
        _tabMouseDown(event: MouseEvent) {

        }

        selectTab(id: string, userGesture: boolean): boolean {
            return false;
        }
        
        /**
         * @param {string} tabId
         * @return {boolean}
         */
        hasTab(tabId:string){
            return !!this._tabsById[tabId];
        }        
        
        /**
         * @param {!Array.<string>} ids
         * @param {boolean=} userGesture
         */
        closeTabs(ids:Array<string>, userGesture:boolean){
            /*
            var focused = this.hasFocus();
            for (var i = 0; i < ids.length; ++i)
                this._innerCloseTab(ids[i], userGesture);
            this._updateTabElements();
            if (this._tabsHistory.length)
                this.selectTab(this._tabsHistory[0].id, false);
            if (focused)
                this.focus();
            */
        }        
        /**
         * @param {string} id
         * @param {boolean=} userGesture
         */
        closeTab(id:string, userGesture:boolean){
            this.closeTabs([id], userGesture);
        }        
    }    
}