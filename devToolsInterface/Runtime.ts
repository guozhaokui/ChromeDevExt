

/*
	一些基础的全局函数。
	file:runtime.js
*/

declare function loadResourcePromise(url:string):Promise<string>;

/*
	格式化路径，去掉.,..等
*/
declare function normalizePath(path:string):string;

declare function loadScriptsPromise(scriptNames:string);//:Promise<undefined>;
export class Runtime{
	_descriptor:ModuleDescriptor;
	static cachedResources:Object;        //用来缓存所有的文件资源的。避免每次都去重新下载。
    
    constructor(dscriptors:ModuleDescriptor,coreModuleName:Array<string>){
        
    }
	/*
		某个脚本加载完了，立刻执行他。
	*/
	scriptSourceLoaded(scriptNumber:number, scriptSource:string):void{
        
    }
	
	/*
		加载descriptors中指定的所有的脚本
	*/
	_loadScripts(){}
	
	/*
		实际执行的时候，是module来执行
	*/
	_loadStylesheets():Promise<void>{
        return null;
    }

	/*
		调用全局的 normalizePath
	*/
	_modularizeURL(resourceName:string){
        
    }
	/*
		加载type=autostart的module，这些module是核心模块
	*/
	_loadAutoStartModules(moduleNames:Array<string>):Promise<Array<any>>{
        return null;
    }		
    
    static 	startApplication:(appName:string)=>void;

    static Extension = Runtime_Extension;
    static Module = Runtime_Module;
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
    
class Runtime_Module{
	/*
		创建实例。
		会创建所有的extension，并且push到runtime对象中
	*/
	constructor(manager:Runtime, descriptor:ModuleDescriptor){
        return null;
    }
	
	_manager:Runtime;
	_descriptor:ModuleDescriptor;
	_name:string;
	_instanceMap:Object;
	/*
		是否已经把module所需的所有的资源加载完毕
		包括脚本，style，html
	*/
	_loaded:boolean;	
	
	_loadStylesheets():Promise<void>{
        return null;
    }
	
	_loadScripts():Promise<void>{
        return null;
    }
	
	_modularizeURL(resourceName:string):string{
        return '';
    }
	
	/*
		创建一个指定class的对象。缓存到 _instanceMap 中。
	*/
	_instance(className:string):Object{
        return null;
    }
	
}

/*
	Module和 Extension的区别：
		Extension只能扩展module?
*/
class Runtime_Extension{
	_module:Runtime_Module;
	_descriptor:ModuleDescriptor;
	_type:string;
	_hasTypeClass:boolean;
	_className:string;
    constuctor(module:Runtime_Module, descriptor){
        
    }
}