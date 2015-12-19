
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
有一个protocol.json，定义domain和module的对应关系
v8自带的消息被分配给
使用的是 node-inspector\tools 目录下面的protocol.json。 可能是路径被服务器重定向了吧。

##从应用来的消息都能被发送给客户端么，需要什么特殊处理么

##Drawer是什么
在 _createAppUI 的时候，会创建Drawer
```javascript
WebInspector.inspectorView = new WebInspector.InspectorView();
    ...
    this._drawer = new WebInspector.Drawer(this._drawerSplitView);
```

##框架
1. 通过module的方式组织在一起，框架负责加载每个module。负责切换panel。隐藏的panel实际还在运行。每个panel的界面由panel自己负责，全部是js实现的。
2. module与框架之间通过事件进行交互
3. 网络模块收到消息后，直接根据domain发给特定的module
4. NI服务器可能需要管理数据。
. model负责dispatch事件么

##概念
1. panel
2. sidebar panes
3. extensions
4. Capabilities
5. model

##写一个自己的module
1. 添加到application的配置中，
2. 创建一个对应的目录，添加 module.json