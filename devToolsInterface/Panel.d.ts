
declare module WebInspector{
	interface Panel extends VBox{
		wasShown():boolean;
	}
	
	var Panel:{
		new(name:string):Panel;
	}
	
	interface PanelFactory{
		createPanel():Panel;
	}
}