module WebInspector {

     
    /**
     * @constructor
     * @implements {WebInspector.Searchable}
     * @extends {WebInspector.VBox}
     * @param {!WebInspector.CPUProfileHeader} profileHeader
     */
    class CPUProfileView extends WebInspector.VBox {
        static _TypeFlame = "Flame";
        static _TypeTree = "Tree";
        static _TypeHeavy = "Heavy";
        focusButton:StatusBarButton;
        excludeButton:StatusBarButton;
        resetButton:StatusBarButton;
        dataGrid:DataGrid;
        
        constructor(profileHeader) {
            super();
            this.element.classList.add("cpu-profile-view");
//             this._searchableView = new WebInspector.SearchableView(this);
//             this._searchableView.show(this.element);
// 
//             this._viewType = WebInspector.settings.createSetting("cpuProfilerView", WebInspector.CPUProfileView._TypeHeavy);
// 
            //Heavy中的三列
             var columns = [];
             columns.push({ id: "self", title: WebInspector.UIString("Self"), width: "120px", sort: WebInspector.DataGrid.Order.Descending, sortable: true });
             columns.push({ id: "total", title: WebInspector.UIString("Total"), width: "120px", sortable: true });
             columns.push({ id: "function", title: WebInspector.UIString("Function"), disclosure: true, sortable: true });
 
             this.dataGrid = new DataGrid(columns);
//             this.dataGrid.addEventListener(WebInspector.DataGrid.Events.SortingChanged, this._sortProfile, this);
// 
//             this.viewSelectComboBox = new WebInspector.StatusBarComboBox(this._changeView.bind(this));
// 
             var options = {};
//             options[WebInspector.CPUProfileView._TypeFlame] = this.viewSelectComboBox.createOption(WebInspector.UIString("Chart"), "", WebInspector.CPUProfileView._TypeFlame);
//             options[WebInspector.CPUProfileView._TypeHeavy] = this.viewSelectComboBox.createOption(WebInspector.UIString("Heavy (Bottom Up)"), "", WebInspector.CPUProfileView._TypeHeavy);
//             options[WebInspector.CPUProfileView._TypeTree] = this.viewSelectComboBox.createOption(WebInspector.UIString("Tree (Top Down)"), "", WebInspector.CPUProfileView._TypeTree);
// 
//             var optionName = this._viewType.get() || WebInspector.CPUProfileView._TypeFlame;
//             var option = options[optionName] || options[WebInspector.CPUProfileView._TypeFlame];
//             this.viewSelectComboBox.select(option);
// 
             this.focusButton = new WebInspector.StatusBarButton(WebInspector.UIString("Focus selected function."), "focus-status-bar-item");
             this.focusButton.setEnabled(false);
             this.focusButton.addEventListener("click", this._focusClicked, this);
 
             this.excludeButton = new WebInspector.StatusBarButton(WebInspector.UIString("Exclude selected function."), "delete-status-bar-item");
             this.excludeButton.setEnabled(false);
             this.excludeButton.addEventListener("click", this._excludeClicked, this);
 
             this.resetButton = new WebInspector.StatusBarButton(WebInspector.UIString("Restore all functions."), "refresh-status-bar-item");
             this.resetButton.setVisible(false);
             this.resetButton.addEventListener("click", this._resetClicked, this);
// 
//             this._profileHeader = profileHeader;
//             this._linkifier = new WebInspector.Linkifier(new WebInspector.Linkifier.DefaultFormatter(30));
// 
//             this.profile = new WebInspector.CPUProfileDataModel(profileHeader._profile || profileHeader.protocolProfile());
// 
//             this._changeView();
//             if (this._flameChart)
//                 this._flameChart.update();
        }



        /**
         * @interface
         */
        static Searchable = class {
            jumpToNextSearchResult(): void { }
            jumpToPreviousSearchResult(): void { }
            searchCanceled(): void { }
            /**
             * @param {!WebInspector.SearchableView.SearchConfig} searchConfig
             * @param {boolean} shouldJump
             * @param {boolean=} jumpBackwards
             * @return {number}
             */
            performSearch(searchConfig: any, shouldJump: boolean, jumpBackwards: boolean): number { return 0; }
            /**
             * @return {number}
             */
            currentSearchResultIndex(): number { return 0; }
        }

        focus() {
            /*
            if (this._flameChart)
                this._flameChart.focus();
            else
                WebInspector.View.prototype.focus.call(this);
             */
        }

        /**
         * @return {?WebInspector.Target}
         */
        target() {
            //return this._profileHeader.target();
        }

        /**
         * @param {number} timeLeft
         * @param {number} timeRight
         */
        selectRange(timeLeft, timeRight) {
            /*
            if (!this._flameChart)
                return;
            this._flameChart.selectRange(timeLeft, timeRight);
            */
        }

        /**
         * @return {!Array.<!WebInspector.StatusBarItem>}
         */
        statusBarItems() {
            //return [this.viewSelectComboBox, this.focusButton, this.excludeButton, this.resetButton];
        }

        /**
         * @return {!WebInspector.ProfileDataGridTree}
         */
        _getBottomUpProfileDataGridTree() {
            // if (!this._bottomUpProfileDataGridTree)
            //     this._bottomUpProfileDataGridTree = new WebInspector.BottomUpProfileDataGridTree(this, /** @type {!ProfilerAgent.CPUProfileNode} */(this.profile.profileHead));
            // return this._bottomUpProfileDataGridTree;
        }

        /**
         * @return {!WebInspector.ProfileDataGridTree}
         */
        _getTopDownProfileDataGridTree() {
            // if (!this._topDownProfileDataGridTree)
            //     this._topDownProfileDataGridTree = new WebInspector.TopDownProfileDataGridTree(this, /** @type {!ProfilerAgent.CPUProfileNode} */(this.profile.profileHead));
            // return this._topDownProfileDataGridTree;
        }

        willHide() {
            //this._currentSearchResultIndex = -1;
        }

        refresh() {
//             var selectedProfileNode = this.dataGrid.selectedNode ? this.dataGrid.selectedNode.profileNode : null;
// 
//             this.dataGrid.rootNode().removeChildren();
// 
//             var children = this.profileDataGridTree.children;
//             var count = children.length;
// 
//             for (var index = 0; index < count; ++index)
//                 this.dataGrid.rootNode().appendChild(children[index]);
// 
//             if (selectedProfileNode)
//                 selectedProfileNode.selected = true;
        }

        refreshVisibleData() {
            // var child = this.dataGrid.rootNode().children[0];
            // while (child) {
            //     child.refresh();
            //     child = child.traverseNextNode(false, null, true);
            // }
        }

        /**
         * @return {!WebInspector.SearchableView}
         */
        searchableView() {
         //   return this._searchableView;
        }

        /**
         * @return {boolean}
         */
        supportsCaseSensitiveSearch() {
            return true;
        }

        /**
         * @return {boolean}
         */
        supportsRegexSearch() {
            return false;
        }

        searchCanceled() {
           // this._searchableElement.searchCanceled();
        }

        /**
         * @param {!WebInspector.SearchableView.SearchConfig} searchConfig
         * @param {boolean} shouldJump
         * @param {boolean=} jumpBackwards
         */
        performSearch(searchConfig, shouldJump, jumpBackwards) {
            // var matchesCount = this._searchableElement.performSearch(searchConfig, shouldJump, jumpBackwards);
            // this._searchableView.updateSearchMatchesCount(matchesCount);
            // this._searchableView.updateCurrentMatchIndex(this._searchableElement.currentSearchResultIndex());
        }

        jumpToNextSearchResult() {
            // this._searchableElement.jumpToNextSearchResult();
            // this._searchableView.updateCurrentMatchIndex(this._searchableElement.currentSearchResultIndex());
        }

        jumpToPreviousSearchResult() {
            // this._searchableElement.jumpToPreviousSearchResult();
            // this._searchableView.updateCurrentMatchIndex(this._searchableElement.currentSearchResultIndex());
        }

        _ensureFlameChartCreated() {
            // if (this._flameChart)
            //     return;
            // this._dataProvider = new WebInspector.CPUFlameChartDataProvider(this.profile, this._profileHeader.target());
            // this._flameChart = new WebInspector.CPUProfileFlameChart(this._dataProvider);
            // this._flameChart.addEventListener(WebInspector.FlameChart.Events.EntrySelected, this._onEntrySelected.bind(this));
        }

        /**
         * @param {!WebInspector.Event} event
         */
        _onEntrySelected(event) {
            // var entryIndex = event.data;
            // var node = this._dataProvider._entryNodes[entryIndex];
            // var target = this._profileHeader.target();
            // if (!node || !node.scriptId || !target)
            //     return;
            // var script = target.debuggerModel.scriptForId(node.scriptId)
            // if (!script)
            //     return;
            // var location = /** @type {!WebInspector.DebuggerModel.Location} */ (script.target().debuggerModel.createRawLocation(script, node.lineNumber, 0));
            // WebInspector.Revealer.reveal(WebInspector.debuggerWorkspaceBinding.rawLocationToUILocation(location));
        }

        _changeView() {
//             if (!this.profile)
//                 return;
// 
//             this._searchableView.closeSearch();
// 
//             if (this._visibleView)
//                 this._visibleView.detach();
// 
//             this._viewType.set(this.viewSelectComboBox.selectedOption().value);
//             switch (this._viewType.get()) {
//                 case WebInspector.CPUProfileView._TypeFlame:
//                     this._ensureFlameChartCreated();
//                     this._visibleView = this._flameChart;
//                     this._searchableElement = this._flameChart;
//                     break;
//                 case WebInspector.CPUProfileView._TypeTree:
//                     this.profileDataGridTree = this._getTopDownProfileDataGridTree();
//                     this._sortProfile();
//                     this._visibleView = this.dataGrid;
//                     this._searchableElement = this.profileDataGridTree;
//                     break;
//                 case WebInspector.CPUProfileView._TypeHeavy:
//                     this.profileDataGridTree = this._getBottomUpProfileDataGridTree();
//                     this._sortProfile();
//                     this._visibleView = this.dataGrid;
//                     this._searchableElement = this.profileDataGridTree;
//                     break;
//             }
// 
//             var isFlame = this._viewType.get() === WebInspector.CPUProfileView._TypeFlame;
//             this.focusButton.setVisible(!isFlame);
//             this.excludeButton.setVisible(!isFlame);
//             this.resetButton.setVisible(!isFlame);
// 
//             this._visibleView.show(this._searchableView.element);
        }

        _focusClicked(event) {
//             if (!this.dataGrid.selectedNode)
//                 return;
// 
//             this.resetButton.setVisible(true);
//             this.profileDataGridTree.focus(this.dataGrid.selectedNode);
//             this.refresh();
//             this.refreshVisibleData();
        }

        _excludeClicked(event) {
//             var selectedNode = this.dataGrid.selectedNode
// 
//             if (!selectedNode)
//                 return;
// 
//             selectedNode.deselect();
// 
//             this.resetButton.setVisible(true);
//             this.profileDataGridTree.exclude(selectedNode);
//             this.refresh();
//             this.refreshVisibleData();
        }

        _resetClicked(event) {
            // this.resetButton.setVisible(false);
            // this.profileDataGridTree.restore();
            // this._linkifier.reset();
            // this.refresh();
            // this.refreshVisibleData();
        }

        _dataGridNodeSelected(node) {
            // this.focusButton.setEnabled(true);
            // this.excludeButton.setEnabled(true);
        }

        _dataGridNodeDeselected(node) {
            // this.focusButton.setEnabled(false);
            // this.excludeButton.setEnabled(false);
        }

        _sortProfile() {
//             var sortAscending = this.dataGrid.isSortOrderAscending();
//             var sortColumnIdentifier = this.dataGrid.sortColumnIdentifier();
//             var sortProperty = {
//                 "self": "selfTime",
//                 "total": "totalTime",
//                 "function": "functionName"
//             }[sortColumnIdentifier];
// 
//             this.profileDataGridTree.sort(WebInspector.ProfileDataGridTree.propertyComparator(sortProperty, sortAscending));
// 
//             this.refresh();
        }
    }

    /**
     * @constructor
     * @extends {WebInspector.ProfileType}
     */
    class CPUProfileType {
        TypeId = "CPU";
    }
}
