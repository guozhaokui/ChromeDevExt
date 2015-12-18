
declare module WebInspector{
	interface SplitView extends View{
		new (isVertical:boolean, 
			secondIsSidebar:any, 
			settingName:string, 
			defaultSidebarWidth:number, 
			defaultSidebarHeight:number, 
			constraintsInDip:boolean):SplitView;
	}
}
