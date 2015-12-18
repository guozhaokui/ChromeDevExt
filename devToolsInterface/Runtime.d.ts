
/*
	一些基础的全局函数。
*/

declare function loadResourcePromise(url:string):Promise<string>;

/*
	格式化路径，去掉.,..等
*/
declare function normalizePath(path:string):string;

declare function loadScriptsPromise(scriptNames:string);//:Promise<undefined>;

interface Runtime{
	_descriptor:ModuleDescriptor;
	
	/*
		某个脚本加载完了，立刻执行他。
	*/
	scriptSourceLoaded(scriptNumber:number, scriptSource:string);
	
	/*
		加载descriptors中指定的所有的脚本
	*/
	_loadScripts();
	
	/*
		实际执行的时候，是module来执行
	*/
	_loadStylesheets():Promise<void>;

	/*
		调用全局的 normalizePath
	*/
	_modularizeURL(resourceName:string);
	/*
		加载type=autostart的module，这些module是核心模块
	*/
	_loadAutoStartModules(moduleNames:Array<string>):Promise<Array<any>>;		
}

declare var Runtime:{
	new (dscriptors:ModuleDescriptor,coreModuleName:Array<string>):Runtime;
	//静态函数
	//
	startApplication:(appName:string)=>void;
}

interface ModuleDescriptor{
	name:string;
	extensions:Array<ExtensionDesciptor>;
	dependencies?:Array<string>;
	scripts:Array<string>;
}

interface ExtensionDesciptor{
	type:string;
	className?:string;
	contextType?:Array<string>;
}

interface Module{
	/*
		创建实例。
		会创建所有的extension，并且push到runtime对象中
	*/
	new(manager:Runtime, descriptor:ModuleDescriptor):Module;
	
	_manager:Runtime;
	_descriptor:ModuleDescriptor;
	_name:string;
	_instanceMap:Object;
	/*
		是否已经把module所需的所有的资源加载完毕
		包括脚本，style，html
	*/
	_loaded:boolean;	
	
	_loadStylesheets():Promise<void>;
	
	_loadScripts():Promise<void>;
	
	_modularizeURL(resourceName:string):string;
	
	/*
		创建一个指定class的对象。缓存到 _instanceMap 中。
	*/
	_instance(className:string):Object;
}

/*
	Module和 Extension的区别：
		Extension只能扩展module?
*/
interface Extension{
	_module:Module;
	_descriptor:ModuleDescriptor;
	_type:string;
	_hasTypeClass:boolean;
	_className:string;
}