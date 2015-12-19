

module WebInspector{
    export interface Searchable{
        searchCanceled():void;
        performSearch(searchConfig, shouldJump:boolean, jumpBackwards:boolean):void;
    }
}