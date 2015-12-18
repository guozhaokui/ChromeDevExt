///<reference path="../devToolsInterface/devTools.d.ts" />
module WebInspector{
'use strict';
	export class testPanel extends Panel{
		static _instanceObject:testPanel;
		
		constructor(){
			super('mypanel');//这个名字必须与json中的一致
		}
		
		static _instance():testPanel{
			return testPanel._instanceObject||(testPanel._instanceObject=new testPanel());
		}
		
		static WrapperView=_WrapperView;
	}
	
	export class testPanelFactory implements PanelFactory{
		createPanel():Panel{
			return testPanel._instance();
		}
	}
	
	class _WrapperView {
		constructor(b:boolean){}
		
	}
}

