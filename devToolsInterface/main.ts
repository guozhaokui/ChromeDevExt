module WebInspector{
    /*
		path:
			main
		file:main.js
	*/
    export var inspectorView:InspectorView;
	class Main{
		showConsole():void{}
		
		/*
			onWindowLoad之后调用
		*/
		_loaded():void{}
		
		/*
			创建所有的uI。
		*/
		_createAppUI():void{
            WebInspector.inspectorView = new InspectorView();
        }
	}
}

