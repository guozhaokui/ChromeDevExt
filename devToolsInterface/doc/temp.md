
##启动流程
1. inspector.html 加载两个脚本
```html
    <script type="text/javascript" src="Runtime.js"></script>
    <script type="text/javascript" src="inspector.js"></script>
```
2. inspector.js只是启动 app:inspector
``` javascript
Runtime.startApplication("inspector");
```
3. 加载完inspector.json之后,开始解析这个json
4. 挨个加载application用到的module，每个module的位置在配置json指定的名字所在的目录，例如console，在 console/module.json  
    如果类型是autostart的，就放到 coreModuleNames 中
5. 等到所有的module都加载完了，就创建 Runtime的实例。Runtime就会创建所有的module对象，每个module加载所有的extension

6. 所有的模块都加载完了之后
    
##application是什么
appName+'.json'定义了application需要的所有的模块。

##定义所有的module的地方

##添加一个panel的流程：

##调试消息怎么知道分配给那个module


##Drawer是什么
在 _createAppUI 的时候，会创建Drawer
```javascript
WebInspector.inspectorView = new WebInspector.InspectorView();
    ...
    this._drawer = new WebInspector.Drawer(this._drawerSplitView);
```

##写一个自己的module
1. 添加到application的配置中，
2. 创建一个对应的目录，添加 module.json