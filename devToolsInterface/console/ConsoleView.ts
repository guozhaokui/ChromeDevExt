
module WebInspector{
    /**
     * console的界面相关的东西。
     */
    export class ConsoleView extends VBox implements Searchable{
        _searchableView:SearchableView;
        _contentsElement:HTMLElement;
        _visibleViewMessages:Array<any>;
        _urlToMessageCount:any;
        _hiddenByFilterCount:number;
        _clearConsoleButton:StatusBarButton;
        constructor(){
            super(false);
            this.registerRequiredCSS("ui/filter.css");
            this.registerRequiredCSS("console/consoleView.css");
            this._searchableView = new WebInspector.SearchableView(this);
            this._searchableView.setMinimalSearchQuerySize(0);
            this._searchableView.show(this.element);           
            
            this._contentsElement = this._searchableView.element;
            this._contentsElement.classList.add("console-view");
            this._visibleViewMessages = [];
            this._urlToMessageCount = {};
            this._hiddenByFilterCount = 0;

            this._clearConsoleButton = new WebInspector.StatusBarButton(WebInspector.UIString("Clear console log."), "clear-status-bar-item");
            this._clearConsoleButton.addEventListener("click", this._requestClearMessages, this);
// 
//             this._executionContextSelector = new WebInspector.StatusBarComboBox(this._executionContextChanged.bind(this), "console-context");
// 
//             /**
//              * @type {!Map.<!WebInspector.ExecutionContext, !Element>}
//              */
//             this._optionByExecutionContext = new Map();
// 
//             this._filter = new WebInspector.ConsoleViewFilter(this);
//             this._filter.addEventListener(WebInspector.ConsoleViewFilter.Events.FilterChanged, this._updateMessageList.bind(this));
// 
//             this._filterBar = new WebInspector.FilterBar();
// 
//             this._preserveLogCheckbox = new WebInspector.StatusBarCheckbox(WebInspector.UIString("Preserve log"));
//             WebInspector.SettingsUI.bindCheckbox(this._preserveLogCheckbox.inputElement, WebInspector.settings.preserveConsoleLog);
//             this._preserveLogCheckbox.element.title = WebInspector.UIString("Do not clear log on page reload / navigation.");
// 
             var statusBar = new WebInspector.StatusBar(this._contentsElement);
             statusBar.appendStatusBarItem(this._clearConsoleButton);
//             statusBar.appendStatusBarItem(this._filterBar.filterButton());
//             statusBar.appendStatusBarItem(this._executionContextSelector);
//             statusBar.appendStatusBarItem(this._preserveLogCheckbox);
// 
//             this._filtersContainer = this._contentsElement.createChild("div", "console-filters-header hidden");
//             this._filtersContainer.appendChild(this._filterBar.filtersElement());
//             this._filterBar.addEventListener(WebInspector.FilterBar.Events.FiltersToggled, this._onFiltersToggled, this);
//             this._filterBar.setName("consoleView");
//             this._filter.addFilters(this._filterBar);
// 
//             this._viewport = new WebInspector.ViewportControl(this);
//             this._viewport.setStickToBottom(true);
//             this._viewport.contentElement().classList.add("console-group", "console-group-messages");
//             this._contentsElement.appendChild(this._viewport.element);
//             this._messagesElement = this._viewport.element;
//             this._messagesElement.id = "console-messages";
//             this._messagesElement.classList.add("monospace");
//             this._messagesElement.addEventListener("click", this._messagesClicked.bind(this), true);
// 
//             this._viewportThrottler = new WebInspector.Throttler(50);
// 
//             this._filterStatusMessageElement = createElementWithClass("div", "console-message");
//             this._messagesElement.insertBefore(this._filterStatusMessageElement, this._messagesElement.firstChild);
//             this._filterStatusTextElement = this._filterStatusMessageElement.createChild("span", "console-info");
//             this._filterStatusMessageElement.createTextChild(" ");
//             var resetFiltersLink = this._filterStatusMessageElement.createChild("span", "console-info node-link");
//             resetFiltersLink.textContent = WebInspector.UIString("Show all messages.");
//             resetFiltersLink.addEventListener("click", this._filter.reset.bind(this._filter), true);
// 
//             this._topGroup = WebInspector.ConsoleGroup.createTopGroup();
//             this._currentGroup = this._topGroup;
// 
//             this._promptElement = this._messagesElement.createChild("div", "source-code");
//             this._promptElement.id = "console-prompt";
//             this._promptElement.spellcheck = false;
// 
//             // FIXME: This is a workaround for the selection machinery bug. See crbug.com/410899
//             var selectAllFixer = this._messagesElement.createChild("div", "console-view-fix-select-all");
//             selectAllFixer.textContent = ".";
// 
//             this._showAllMessagesCheckbox = new WebInspector.StatusBarCheckbox(WebInspector.UIString("Show all messages"));
//             this._showAllMessagesCheckbox.inputElement.checked = true;
//             this._showAllMessagesCheckbox.inputElement.addEventListener("change", this._updateMessageList.bind(this), false);
// 
//             this._showAllMessagesCheckbox.element.classList.add("hidden");
// 
//             statusBar.appendStatusBarItem(this._showAllMessagesCheckbox);
// 
//             this._registerShortcuts();
// 
//             this._messagesElement.addEventListener("contextmenu", this._handleContextMenuEvent.bind(this), false);
//             WebInspector.settings.monitoringXHREnabled.addChangeListener(this._monitoringXHREnabledSettingChanged, this);
// 
//             this._linkifier = new WebInspector.Linkifier();
// 
//             /** @type {!Array.<!WebInspector.ConsoleViewMessage>} */
//             this._consoleMessages = [];
// 
//             this._prompt = new WebInspector.TextPromptWithHistory(WebInspector.ExecutionContextSelector.completionsForTextPromptInCurrentContext);
//             this._prompt.setSuggestBoxEnabled(true);
//             this._prompt.renderAsBlock();
//             this._prompt.attach(this._promptElement);
//             this._prompt.proxyElement.addEventListener("keydown", this._promptKeyDown.bind(this), false);
//             this._prompt.setHistoryData(WebInspector.settings.consoleHistory.get());
//             var historyData = WebInspector.settings.consoleHistory.get();
//             this._prompt.setHistoryData(historyData);
// 
//             this._updateFilterStatus();
//             WebInspector.settings.consoleTimestampsEnabled.addChangeListener(this._consoleTimestampsSettingChanged, this);
// 
//             this._registerWithMessageSink();
//             WebInspector.targetManager.observeTargets(this);
//             WebInspector.targetManager.addModelListener(WebInspector.RuntimeModel, WebInspector.RuntimeModel.Events.ExecutionContextCreated, this._onExecutionContextCreated, this);
//             WebInspector.targetManager.addModelListener(WebInspector.RuntimeModel, WebInspector.RuntimeModel.Events.ExecutionContextDestroyed, this._onExecutionContextDestroyed, this);
//             WebInspector.targetManager.addEventListener(WebInspector.TargetManager.Events.MainFrameNavigated, this._onMainFrameNavigated, this);
// 
             this._initConsoleMessages();
// 
//             WebInspector.context.addFlavorChangeListener(WebInspector.ExecutionContext, this._executionContextChangedExternally, this);
//              
        }
        
        searchCanceled():void{
            
        }
        performSearch(searchConfig, shouldJump:boolean, jumpBackwards:boolean):void{
            
        }
        
        /**
         * 对console事件的处理
         */
        _initConsoleMessages(){
            
        }
        
        _requestClearMessages(){
            var targets = WebInspector.targetManager.targets();
            for (var i = 0; i < targets.length; ++i)
                targets[i].consoleModel.requestClearMessages();
        }        
        
        supportsCaseSensitiveSearch():boolean{
            return false;
        }
        supportsRegexSearch():boolean{
            return false;
        }
        jumpToNextSearchResult():void{}
        jumpToPreviousSearchResult():void{}        
    }   
}
