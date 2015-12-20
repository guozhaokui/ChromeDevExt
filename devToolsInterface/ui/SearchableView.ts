

module WebInspector{
    export interface Searchable{
        searchCanceled():void;
        performSearch(searchConfig, shouldJump:boolean, jumpBackwards:boolean):void;
    }
    
    export class SearchableView extends VBox{
        _searchProvider:Searchable;
        _settingName:string;
        _minimalSearchQuerySize:number;
        constructor(searchable:Searchable,settingName?:string){
            super(true);
            this.registerRequiredCSS('ui/searchableView.css');
            this._searchProvider = searchable;
            this._settingName = settingName;
            this.element.addEventListener('keydown',this._onKeyDown.bind(this),false);
        }
        
        _onKeyDown(event:Event) {
            //var shortcutKey = WebInspector.KeyboardShortcut.makeKeyFromEvent(/**@type {!KeyboardEvent}*/(event));
            //var handler = this._shortcuts[shortcutKey];
            //if (handler && handler(event))
            //    event.consume(true);
        }
        
        setMinimalSearchQuerySize(minimalSearchQuerySize:number) {
            this._minimalSearchQuerySize = minimalSearchQuerySize;
        }
    }
}