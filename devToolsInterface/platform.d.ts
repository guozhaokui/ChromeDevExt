
/*
	扩展DOM的接口。
*/

interface Document{
	/*
		创建一个对象，并且设置对象的 className
	*/
	createElementWithClass(elementName:string, className:string):HTMLElement;
}