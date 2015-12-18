///<reference path="../devToolsInterface/Panel.d.ts" />

module WebInspector{
	export class testPanel extends Panel{
		static _instanceObject:testPanel;
		
		constructor(){
			super('testPanel');
		}
		
		static _instance():testPanel{
			return testPanel._instanceObject||(testPanel._instanceObject=new testPanel());
		}
	}
	
	export class testPanelFactory implements PanelFactory{
		createPanel():Panel{
			return testPanel._instance();
		}
	}
}

