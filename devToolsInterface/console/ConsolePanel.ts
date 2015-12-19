///<reference path="../devTools.ts" />
module WebInspector{
    
    /**
     * ConsolePanel对应的是Console面板。
     */
    export class ConsolePanel extends WebInspector.Panel{
        constructor(){
            super("console");
        }
        
		/*
			返回一个view.第一次的时候会创建一个。
		*/
		_view():ConsoleView{
            return null;
        }
        
        defaultFocusedElement():HTMLElement{
            return null;
        }
        
        wasShown():boolean{
            return false;
        }
        
        willHide(){}
        
        static show():void{}	//WebInspector.inspectorView.setCurrentPanel(WebInspector.ConsolePanel._instance());
    }
    
    class ConsolePanel_WrapperView extends WebInspector.VBox{
        constructor(){
            super(false);
             this.element.classList.add("console-view-wrapper");
            //WebInspector.ConsolePanel.WrapperView._instance = this;

            //this._view = WebInspector.ConsolePanel._view();
            // FIXME: this won't be needed once drawer becomes a view.
            //this.wasShown();             
        }
    }
// 
// 	module ConsolePanel{
// 		/*
// 			下面的是ConsolePanel中的静态的类。
// 			由于interface不能 static xx=interface{},
// 			只好用这种方法定义了。
// 		*/
// 		interface WrapperView extends VBox{
// 			wasShown():boolean;
// 		}
// 		var WrapperView:{
// 			new ():WrapperView;
// 		}
// 	}
	
	//interface ConsoleView{
	//}	    
}