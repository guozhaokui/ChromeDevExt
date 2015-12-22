
module WebInspector{
   	export class Drawer extends VBox{
		constructor(splitView:any){
            super();
        }	
	}
	
	export class TabbedPane extends VBox{
		_tabs:any;
		_tabsById:Object;	//实际当map来用(string,TabbedPaneTab)
        constructor(){
            super();
        }
		/*
			鼠标在当前tab上downl了。
			这个会调用到 selectTab
		*/
		_tabMouseDown(event:MouseEvent){
            
        }
		
		selectTab(id:string ,userGesture:boolean):boolean{
            return false;
        }
	}

}