
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

##什么时候添加事件监听的
都是在  _loadedWithCapabilities 的时候么  
```javascript
    WebInspector.ResourceTreeModel = function(target)
        ...
        target.consoleModel.addEventListener(WebInspector.ConsoleModel.Events.MessageAdded, this._consoleMessageAdded, this);
```
##Drawer是什么
在 _createAppUI 的时候，会创建Drawer
```javascript
WebInspector.inspectorView = new WebInspector.InspectorView();
    ...
    this._drawer = new WebInspector.Drawer(this._drawerSplitView);
```

##button
怎么设置图片  
statusbarButton


##框架
1. 通过module的方式组织在一起，框架负责加载每个module。负责切换panel。隐藏的panel实际还在运行。每个panel的界面由panel自己负责，全部是js实现的。
2. module与框架之间通过事件进行交互
3. 网络模块收到消息后，直接根据domain发给特定的module
4. NI服务器可能需要管理数据。
. model负责dispatch事件么

##可重用控件
都在ui目录下。
1. button
2. list
3. input

##uiutil对动画的控制

##flameChart是两个canvas么
只是一个，cpuprofile的flamechart是两个，用FlameChart控件显示下面的内容，上面的曲线是另外一个

##flamechart的数据在哪管理

##概念
1. panel
2. sidebar panes
3. extensions
4. Capabilities
5. model
6. target
6. drawer 
下面那部分界面显示的就是drawer-content

##console的输入是怎么做的
Console._prompt 
class TextPrompt
通过 onKeyDown,onInput自己做的，带自动提示功能。

##canvas是在哪里创建的
FlameChart.ts中（下半部分）和CPuprofileFlameChart中（上半部分）
###位置
profilesPanel.css
```css
.cpu-profile-flame-chart-overview-container {
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    height: 80px;
}

#cpu-profile-flame-chart-overview-container {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.cpu-profile-flame-chart-overview-canvas {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
}
```

##datprovider
从哪里得到的原始数据
SDKModel

##写一个自己的module
1. 添加到application的配置中，
2. 创建一个对应的目录，添加 module.json
1. 需要一个panel，提供一个 PanelFactory 实例用来创建这个panel。
    wrapperView是框架创建的，然后显示view就是自己的事情了
    这个panel下面有一个view提供界面内容，这个view由WrapperView包着
    
##console的显示流程
1. tabbedPane._showTab,这时候_view已经是consoelView了,parent要可见，此时的parentView是 WebInspector.TabbedPane
2. View.Notify(func)   调用func,就调到了ConsolePanle.wasShown. 即这个函数是必须的.
