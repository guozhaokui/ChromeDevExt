
/*
	path:
		main
*/

declare module WebInspector{
	interface Main{
		showConsole();
		
		/*
			onWindowLoad之后调用
		*/
		_loaded();
		
		/*
			创建所有的uI。
		*/
		_createAppUI();
	}
}