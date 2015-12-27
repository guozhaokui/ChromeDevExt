
module WebInspector {
    
    /**
     * @constructor
     * @extends {WebInspector.Object}
     * @param {?Object.<string, *>=} data
     * @param {boolean=} hasChildren
     */
    class DataGridNode {
        /** @type {?Element} */
        _element = null;
        /** @type {boolean} */
        _expanded = false;
        /** @type {boolean} */
        _selected = false;
        /** @type {number|undefined} */
        _depth;
        /** @type {boolean|undefined} */
        _revealed;
        /** @type {boolean} */
        _attached = false;
        /** @type {?{parent: !WebInspector.DataGridNode, index: number}} */
        _savedPosition = null;
        _hasChildren:boolean=false;
        _leftPadding:number=0;
        /** @type {boolean} */
        _shouldRefreshChildren = true;
        /** @type {!Object.<string, *>} */
        _data = {};
        /** @type {!Array.<!WebInspector.DataGridNode>} */
        children = [];
        /** @type {?WebInspector.DataGrid} */
        dataGrid = null;
        /** @type {?WebInspector.DataGridNode} */
        parent = null;
        /** @type {?WebInspector.DataGridNode} */
        previousSibling = null;
        /** @type {?WebInspector.DataGridNode} */
        nextSibling = null;
        /** @type {number} */
        disclosureToggleWidth = 10;
        /** @type {boolean} */
        selectable=true;

        /** @type {boolean} */
        _isRoot=false;
        constructor(data, hasChildren) {
            this.hasChildren=hasChildren||false;
        }


        /**
         * @return {!Element}
         */
        element() {
            if (!this._element) {
                this.createElement();
                this.createCells();
            }
            return /** @type {!Element} */ (this._element);
        }

        /**
         * @protected
         */
        createElement() {
            //this._element = createElement("tr");
            this._element._dataGridNode = this;

            if (this.hasChildren)
                this._element.classList.add("parent");
            if (this.expanded)
                this._element.classList.add("expanded");
            if (this.selected)
                this._element.classList.add("selected");
            if (this.revealed)
                this._element.classList.add("revealed");
        }

        /**
         * @protected
         */
        createCells() {
            this._element.removeChildren();
            var columnsArray = this.dataGrid._visibleColumnsArray;
            for (var i = 0; i < columnsArray.length; ++i)
                this._element.appendChild(this.createCell(columnsArray[i].identifier));
            this._element.appendChild(this._createTDWithClass("corner"));
        }

        get data() {
            return this._data;
        }

        set data(x) {
            this._data = x || {};
            this.refresh();
        }

        get revealed() {
            if (this._revealed !== undefined)
                return this._revealed;

            var currentAncestor = this.parent;
            while (currentAncestor && !currentAncestor._isRoot) {
                if (!currentAncestor.expanded) {
                    this._revealed = false;
                    return false;
                }

                currentAncestor = currentAncestor.parent;
            }

            this._revealed = true;
            return true;
        }

        set hasChildren(x) {
            if (this._hasChildren === x)
                return;

            this._hasChildren = x;

            if (!this._element)
                return;

            this._element.classList.toggle("parent", this._hasChildren);
            this._element.classList.toggle("expanded", this._hasChildren && this.expanded);
        }

        get hasChildren() {
            return this._hasChildren;
        }

        set revealed(x) {
            if (this._revealed === x)
                return;

            this._revealed = x;

            if (this._element)
                this._element.classList.toggle("revealed", this._revealed);

            for (var i = 0; i < this.children.length; ++i)
                this.children[i].revealed = x && this.expanded;
        }

        /**
         * @return {number}
         */
        get depth() {
            if (this._depth !== undefined)
                return this._depth;
            if (this.parent && !this.parent._isRoot)
                this._depth = this.parent.depth + 1;
            else
                this._depth = 0;
            return this._depth;
        }

        get leftPadding() {
            if (typeof this._leftPadding === "number")
                return this._leftPadding;

            this._leftPadding = this.depth * this.dataGrid.indentWidth;
            return this._leftPadding;
        }

        get shouldRefreshChildren() {
            return this._shouldRefreshChildren;
        }

        set shouldRefreshChildren(x) {
            this._shouldRefreshChildren = x;
            if (x && this.expanded)
                this.expand();
        }

        get selected() {
            return this._selected;
        }

        set selected(x) {
            // if (x)
            //     this.select();
            // else
            //     this.deselect();
        }

        get expanded() {
            return this._expanded;
        }

        /**
         * @param {boolean} x
         */
        set expanded(x) {
            if (x)
                this.expand();
            else
                this.collapse();
        }

        refresh() {
            if (!this.dataGrid)
                this._element = null;
            if (!this._element)
                return;
            this.createCells();
        }

        /**
         * @param {string} className
         * @return {!Element}
         */
        _createTDWithClass(className) {
            var cell = createElementWithClass("td", className);
            var cellClass = this.dataGrid._cellClass;
            if (cellClass)
                cell.classList.add(cellClass);
            return cell;
        }

        /**
         * @param {string} columnIdentifier
         * @return {!Element}
         */
        createTD(columnIdentifier) {
            var cell = this._createTDWithClass(columnIdentifier + "-column");
            //cell.columnIdentifier_ = columnIdentifier;

            var alignment = this.dataGrid._columns[columnIdentifier].align;
            if (alignment)
                cell.classList.add(alignment);

            return cell;
        }

        /**
         * @param {string} columnIdentifier
         * @return {!Element}
         */
        createCell(columnIdentifier) {
            var cell = this.createTD(columnIdentifier);

            var data = this.data[columnIdentifier];
            if (data instanceof Node) {
                cell.appendChild(data);
            } else {
                cell.textContent = data;
                if (this.dataGrid._columns[columnIdentifier].longText)
                    cell.title = data;
            }

            if (columnIdentifier === this.dataGrid.disclosureColumnIdentifier) {
                cell.classList.add("disclosure");
                if (this.leftPadding)
                    cell.style.setProperty("padding-left", this.leftPadding + "px");
            }

            return cell;
        }

        /**
         * @return {number}
         */
        nodeSelfHeight() {
            return 16;
        }

        /**
         * @param {!WebInspector.DataGridNode} child
         */
        appendChild(child) {
            this.insertChild(child, this.children.length);
        }

        /**
         * @param {!WebInspector.DataGridNode} child
         * @param {number} index
         */
        insertChild(child, index) {
            if (!child)
                throw ("insertChild: Node can't be undefined or null.");
            if (child.parent === this)
                throw ("insertChild: Node is already a child of this node.");

            if (child.parent)
                child.parent.removeChild(child);

            this.children.splice(index, 0, child);
            this.hasChildren = true;

            child.parent = this;
            child.dataGrid = this.dataGrid;
            child.recalculateSiblings(index);

            child._depth = undefined;
            child._revealed = undefined;
            child._attached = false;
            child._shouldRefreshChildren = true;

            var current = child.children[0];
            while (current) {
                current.dataGrid = this.dataGrid;
                current._depth = undefined;
                current._revealed = undefined;
                current._attached = false;
                current._shouldRefreshChildren = true;
                current = current.traverseNextNode(false, child, true);
            }

            if (this.expanded)
                child._attach();
            if (!this.revealed)
                child.revealed = false;
        }

        /**
         * @param {!WebInspector.DataGridNode} child
         */
        removeChild(child) {
            if (!child)
                throw ("removeChild: Node can't be undefined or null.");
            if (child.parent !== this)
                throw ("removeChild: Node is not a child of this node.");

            child.deselect();
            child._detach();

            //this.children.remove(child, true);

            if (child.previousSibling)
                child.previousSibling.nextSibling = child.nextSibling;
            if (child.nextSibling)
                child.nextSibling.previousSibling = child.previousSibling;

            child.dataGrid = null;
            child.parent = null;
            child.nextSibling = null;
            child.previousSibling = null;

            if (this.children.length <= 0)
                this.hasChildren = false;
        }

        removeChildren() {
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i];
                child.deselect();
                child._detach();

                child.dataGrid = null;
                child.parent = null;
                child.nextSibling = null;
                child.previousSibling = null;
            }

            this.children = [];
            this.hasChildren = false;
        }

        /**
         * @param {number} myIndex
         */
        recalculateSiblings(myIndex) {
            if (!this.parent)
                return;

            var previousChild = this.parent.children[myIndex - 1] || null;
            if (previousChild)
                previousChild.nextSibling = this;
            this.previousSibling = previousChild;

            var nextChild = this.parent.children[myIndex + 1] || null;
            if (nextChild)
                nextChild.previousSibling = this;
            this.nextSibling = nextChild;
        }

        collapse() {
            if (this._isRoot)
                return;
            if (this._element)
                this._element.classList.remove("expanded");

            this._expanded = false;

            for (var i = 0; i < this.children.length; ++i)
                this.children[i].revealed = false;
        }

        collapseRecursively() {
            var item:DataGridNode = this;
            while (item) {
                if (item.expanded)
                    item.collapse();
                item = item.traverseNextNode(false, this, true);
            }
        }

        populate() { }

        expand() {
            if (!this.hasChildren || this.expanded)
                return;
            if (this._isRoot)
                return;

            if (this.revealed && !this._shouldRefreshChildren)
                for (var i = 0; i < this.children.length; ++i)
                    this.children[i].revealed = true;

            if (this._shouldRefreshChildren) {
                for (var i = 0; i < this.children.length; ++i)
                    this.children[i]._detach();

                this.populate();

                if (this._attached) {
                    for (var i = 0; i < this.children.length; ++i) {
                        var child = this.children[i];
                        if (this.revealed)
                            child.revealed = true;
                        child._attach();
                    }
                }

                this._shouldRefreshChildren = false;
            }

            if (this._element)
                this._element.classList.add("expanded");

            this._expanded = true;
        }

        expandRecursively() {
            var item:DataGridNode = this;
            while (item) {
                item.expand();
                item = item.traverseNextNode(false, this);
            }
        }

        reveal() {
            if (this._isRoot)
                return;
            var currentAncestor = this.parent;
            while (currentAncestor && !currentAncestor._isRoot) {
                if (!currentAncestor.expanded)
                    currentAncestor.expand();
                currentAncestor = currentAncestor.parent;
            }

            this.element().scrollIntoViewIfNeeded(false);
        }

        /**
         * @param {boolean=} supressSelectedEvent
         */
        select(supressSelectedEvent) {
            if (!this.dataGrid || !this.selectable || this.selected)
                return;

            if (this.dataGrid.selectedNode)
                this.dataGrid.selectedNode.deselect();

            this._selected = true;
            this.dataGrid.selectedNode = this;

            if (this._element)
                this._element.classList.add("selected");

            if (!supressSelectedEvent)
                this.dataGrid.dispatchEventToListeners(DataGrid.Events.SelectedNode);
        }

        revealAndSelect() {
            if (this._isRoot)
                return;
            this.reveal();
            //this.select();
        }

        /**
         * @param {boolean=} supressDeselectedEvent
         */
        deselect(supressDeselectedEvent) {
            if (!this.dataGrid || this.dataGrid.selectedNode !== this || !this.selected)
                return;

            this._selected = false;
            this.dataGrid.selectedNode = null;

            if (this._element)
                this._element.classList.remove("selected");

            if (!supressDeselectedEvent)
                this.dataGrid.dispatchEventToListeners(DataGrid.Events.DeselectedNode);
        }

        /**
         * @param {boolean} skipHidden
         * @param {?WebInspector.DataGridNode=} stayWithin
         * @param {boolean=} dontPopulate
         * @param {!Object=} info
         * @return {?WebInspector.DataGridNode}
         */
        traverseNextNode(skipHidden:boolean, stayWithin:DataGridNode, dontPopulate?:boolean, info?:Object) {
            if (!dontPopulate && this.hasChildren)
                this.populate();

            //if (info)
            //    info.depthChange = 0;

            var node = (!skipHidden || this.revealed) ? this.children[0] : null;
            if (node && (!skipHidden || this.expanded)) {
                //if (info)
                //    info.depthChange = 1;
                return node;
            }

            if (this === stayWithin)
                return null;

            node = (!skipHidden || this.revealed) ? this.nextSibling : null;
            if (node)
                return node;

            node = this;
            while (node && !node._isRoot && !((!skipHidden || node.revealed) ? node.nextSibling : null) && node.parent !== stayWithin) {
                //if (info)
                //    info.depthChange -= 1;
                node = node.parent;
            }

            if (!node)
                return null;

            return (!skipHidden || node.revealed) ? node.nextSibling : null;
        }

        /**
         * @param {boolean} skipHidden
         * @param {boolean=} dontPopulate
         * @return {?WebInspector.DataGridNode}
         */
        traversePreviousNode(skipHidden, dontPopulate) {
            var node = (!skipHidden || this.revealed) ? this.previousSibling : null;
            if (!dontPopulate && node && node.hasChildren)
                node.populate();

            while (node && ((!skipHidden || (node.revealed && node.expanded)) ? node.children[node.children.length - 1] : null)) {
                if (!dontPopulate && node.hasChildren)
                    node.populate();
                node = ((!skipHidden || (node.revealed && node.expanded)) ? node.children[node.children.length - 1] : null);
            }

            if (node)
                return node;

            if (!this.parent || this.parent._isRoot)
                return null;

            return this.parent;
        }

        /**
         * @return {boolean}
         */
        isEventWithinDisclosureTriangle(event) {
            if (!this.hasChildren)
                return false;
            var cell = event.target.enclosingNodeOrSelfWithNodeName("td");
            if (!cell.classList.contains("disclosure"))
                return false;

            var left = cell.totalOffsetLeft() + this.leftPadding;
            return event.pageX >= left && event.pageX <= left + this.disclosureToggleWidth;
        }

        _attach() {
            if (!this.dataGrid || this._attached)
                return;

            this._attached = true;

            var nextNode = null;
            var previousNode = this.traversePreviousNode(true, true);
            var previousElement = previousNode ? previousNode.element() : this.dataGrid._topFillerRow;
            this.dataGrid.dataTableBody.insertBefore(this.element(), previousElement.nextSibling);

            if (this.expanded)
                for (var i = 0; i < this.children.length; ++i)
                    this.children[i]._attach();
        }

        _detach() {
            if (!this._attached)
                return;

            this._attached = false;

            if (this._element)
                this._element.remove();

            for (var i = 0; i < this.children.length; ++i)
                this.children[i]._detach();

            this.wasDetached();
        }

        wasDetached() {
        }

        savePosition() {
            if (this._savedPosition)
                return;

            if (!this.parent)
                throw ("savePosition: Node must have a parent.");
            this._savedPosition = {
                parent: this.parent,
                index: this.parent.children.indexOf(this)
            };
        }

        restorePosition() {
            if (!this._savedPosition)
                return;

            if (this.parent !== this._savedPosition.parent)
                this._savedPosition.parent.insertChild(this, this._savedPosition.index);

            this._savedPosition = null;
        }
    }

    export class DataGrid extends View {
        static Events = {
            SelectedNode: "SelectedNode",
            DeselectedNode: "DeselectedNode",
            SortingChanged: "SortingChanged",
            ColumnsResized: "ColumnsResized"
        }      
        
        static Order = {
            Ascending: "sort-ascending",
            Descending: "sort-descending"
        }
        
        Align = {
            Center: "center",
            Right: "right"
        }
                  
        constructor(columnsArray: Array<any>, editCallback?, deleteCallback?, refreshCallback?, contextMenuCallback?) {
            super();
            this.registerRequiredCSS("ui/dataGrid.css");
            this.element.className = "data-grid"; // Override
            this.element.tabIndex = 0;
            this.element.addEventListener("keydown", this._keyDown.bind(this), false);
        }

        _keyDown(event: Event) {
            //             if (!this.selectedNode || event.shiftKey || event.metaKey || event.ctrlKey || this._editing)
            //                 return;
            // 
            //             var handled = false;
            //             var nextSelectedNode;
            //             if (event.keyIdentifier === "Up" && !event.altKey) {
            //                 nextSelectedNode = this.selectedNode.traversePreviousNode(true);
            //                 while (nextSelectedNode && !nextSelectedNode.selectable)
            //                     nextSelectedNode = nextSelectedNode.traversePreviousNode(true);
            //                 handled = nextSelectedNode ? true : false;
            //             } else if (event.keyIdentifier === "Down" && !event.altKey) {
            //                 nextSelectedNode = this.selectedNode.traverseNextNode(true);
            //                 while (nextSelectedNode && !nextSelectedNode.selectable)
            //                     nextSelectedNode = nextSelectedNode.traverseNextNode(true);
            //                 handled = nextSelectedNode ? true : false;
            //             } else if (event.keyIdentifier === "Left") {
            //                 if (this.selectedNode.expanded) {
            //                     if (event.altKey)
            //                         this.selectedNode.collapseRecursively();
            //                     else
            //                         this.selectedNode.collapse();
            //                     handled = true;
            //                 } else if (this.selectedNode.parent && !this.selectedNode.parent._isRoot) {
            //                     handled = true;
            //                     if (this.selectedNode.parent.selectable) {
            //                         nextSelectedNode = this.selectedNode.parent;
            //                         handled = nextSelectedNode ? true : false;
            //                     } else if (this.selectedNode.parent)
            //                         this.selectedNode.parent.collapse();
            //                 }
            //             } else if (event.keyIdentifier === "Right") {
            //                 if (!this.selectedNode.revealed) {
            //                     this.selectedNode.reveal();
            //                     handled = true;
            //                 } else if (this.selectedNode.hasChildren) {
            //                     handled = true;
            //                     if (this.selectedNode.expanded) {
            //                         nextSelectedNode = this.selectedNode.children[0];
            //                         handled = nextSelectedNode ? true : false;
            //                     } else {
            //                         if (event.altKey)
            //                             this.selectedNode.expandRecursively();
            //                         else
            //                             this.selectedNode.expand();
            //                     }
            //                 }
            //             } else if (event.keyCode === 8 || event.keyCode === 46) {
            //                 if (this._deleteCallback) {
            //                     handled = true;
            //                     this._deleteCallback(this.selectedNode);
            //                     this.changeNodeAfterDeletion();
            //                 }
            //             } else if (isEnterKey(event)) {
            //                 if (this._editCallback) {
            //                     handled = true;
            //                     this._startEditing(this.selectedNode._element.children[this._nextEditableColumn(-1)]);
            //                 }
            //             }
            // 
            //             if (nextSelectedNode) {
            //                 nextSelectedNode.reveal();
            //                 nextSelectedNode.select();
            //             }
            // 
            //             if (handled)
            //                 event.consume(true);
        }
    }
}