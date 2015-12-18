
declare module WebInspector{
	/*
		path:
			components
	*/
	interface InspectorView extends VBox{
		//当前
		_currentPanel:Panel;
		
		/*
			像菜单的那个界面，几大部分：Elements,console,Network...
		*/
		_tabbedPane:TabbedPane;
		
		/*
			转到选中的tab上。
		*/
		_tabSelected();
		
		showPanel(panelName:string):Promise<Panel>;
		
		/*
		*/
		setCurrentPanel(panel:Panel):Panel;
	}	
}
