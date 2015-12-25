///<reference path="../devToolsInterface/devTools.ts" />
module WebInspector{
'use strict';
	export class testPanel_WrapperView extends VBox {
        _view:testPanelView;
		constructor(){
            super(false);
            this._view = testPanel._view();
            //立即显示出来
            this.wasShown();
        }
		
        wasShown(){
            if (!WebInspector.inspectorView.currentPanel() || WebInspector.inspectorView.currentPanel().name !== "mypanel")
                this._showViewInWrapper();
        }
        
        //把自己的view显示出来
        _showViewInWrapper(){
            this._view.show(this.element);
        }
	}

	export class testPanel extends Panel{
		static _instanceObject:testPanel;
		_view:testPanelView;
        static _testPanelView:testPanelView;
        
		constructor(){
			super('mypanel');//这个名字必须与json中的一致
		}
		
		static _instance():testPanel{
			return testPanel._instanceObject||(testPanel._instanceObject=new testPanel());
		}
        
		static _view():testPanelView{
            if( !testPanel._testPanelView )
                testPanel._testPanelView = new testPanelView();
            return testPanel._testPanelView;
        }		
        
		static WrapperView=testPanel_WrapperView;
	}
	
	export class testPanelFactory implements PanelFactory{
        constructor(){
            
        }
		createPanel():Panel{
			return testPanel._instance();
		}
	}
}

