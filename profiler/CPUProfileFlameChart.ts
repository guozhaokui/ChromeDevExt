
module WebInspector {
    
    /**
     * @return {!WebInspector.FlameChart.ColorGenerator}
     */
    function CPUFlameChartDataProvider_colorGenerator() {
        return null;
    }

    export class CPUFlameChartDataProvider implements FlameChartDataProvider {
        _cpuProfile: any;
        _target: WebInspector.Target;
        _colorGenerator: any;
        _maxStackDepth:number;
        static _colorGenerator = CPUFlameChartDataProvider_colorGenerator;
        /**
         * @constructor
         * @implements {WebInspector.FlameChartDataProvider}
         * @param {!WebInspector.CPUProfileDataModel} cpuProfile
         * @param {?WebInspector.Target} target
         */
        constructor(cpuProfile, target: WebInspector.Target) {
            this._cpuProfile = cpuProfile;
            this._target = target;
            this._colorGenerator = CPUFlameChartDataProvider_colorGenerator();
        }

        /**
         * @return {number}
         */
        barHeight() {
            return 15;
        }

        /**
         * @return {number}
         */
        textBaseline() {
            return 4;
        }

        /**
         * @return {number}
         */
        textPadding() {
            return 2;
        }

        /**
         * @param {number} startTime
         * @param {number} endTime
         * @return {?Array.<number>}
         */
        dividerOffsets(startTime:number, endTime:number) {
            return null;
        }

        /**
         * @return {number}
         */
        minimumBoundary() {
            return this._cpuProfile.profileStartTime;
        }

        /**
         * @return {number}
         */
        totalTime() {
            return this._cpuProfile.profileHead.totalTime;
        }

        /**
         * @return {number}
         */
        maxStackDepth() {
            return this._maxStackDepth;
        }

        /**
         * @return {?WebInspector.FlameChart.TimelineData}
         */
        timelineData() {
            //return this._timelineData || this._calculateTimelineData();
        }

        /**
         * @param {number} index
         * @return {string}
         */
        markerColor(index):string {
            throw new Error("Unreachable.");
        }

        /**
         * @param {number} index
         * @return {string}
         */
        markerTitle(index):string {
            throw new Error("Unreachable.");
        }

        /**
         * @param {number} index
         * @return {boolean}
         */
        isTallMarker(index):boolean {
            throw new Error("Unreachable.");
        }

        /**
         * @return {!WebInspector.FlameChart.TimelineData}
         */
        _calculateTimelineData() {
            /**
             * @constructor
             * @param {number} depth
             * @param {number} duration
             * @param {number} startTime
             * @param {number} selfTime
             * @param {!ProfilerAgent.CPUProfileNode} node
             */
            function ChartEntry(depth, duration, startTime, selfTime, node) {
                this.depth = depth;
                this.duration = duration;
                this.startTime = startTime;
                this.selfTime = selfTime;
                this.node = node;
            }

            /** @type {!Array.<?ChartEntry>} */
            var entries = [];
            /** @type {!Array.<number>} */
            var stack = [];
            var maxDepth = 5;

            function onOpenFrame() {
                stack.push(entries.length);
                // Reserve space for the entry, as they have to be ordered by startTime.
                // The entry itself will be put there in onCloseFrame.
                entries.push(null);
            }
            function onCloseFrame(depth, node, startTime, totalTime, selfTime) {
                var index = stack.pop();
                entries[index] = new ChartEntry(depth, totalTime, startTime, selfTime, node);
                maxDepth = Math.max(maxDepth, depth);
            }
            this._cpuProfile.forEachFrame(onOpenFrame, onCloseFrame);

            /** @type {!Array.<!ProfilerAgent.CPUProfileNode>} */
            var entryNodes = new Array(entries.length);
            var entryLevels = new Uint8Array(entries.length);
            var entryTotalTimes = new Float32Array(entries.length);
            var entrySelfTimes = new Float32Array(entries.length);
            var entryStartTimes = new Float64Array(entries.length);
            var minimumBoundary = this.minimumBoundary();

            for (var i = 0; i < entries.length; ++i) {
                var entry = entries[i];
                entryNodes[i] = entry.node;
                entryLevels[i] = entry.depth;
                entryTotalTimes[i] = entry.duration;
                entryStartTimes[i] = entry.startTime;
                entrySelfTimes[i] = entry.selfTime;
            }

            this._maxStackDepth = maxDepth;

            //this._timelineData = new WebInspector.FlameChart.TimelineData(entryLevels, entryTotalTimes, entryStartTimes);

            /** @type {!Array.<!ProfilerAgent.CPUProfileNode>} */
            //this._entryNodes = entryNodes;
            //this._entrySelfTimes = entrySelfTimes;

            //return this._timelineData;
        }

        /**
         * @param {number} ms
         * @return {string}
         */
        _millisecondsToString(ms) {
            if (ms === 0)
                return "0";
            if (ms < 1000)
                return WebInspector.UIString("%.1f\u2009ms", ms);
            //return Number.secondsToString(ms / 1000, true);
        }

        /**
         * @param {number} entryIndex
         * @return {?Array.<!{title: string, text: string}>}
         */
        prepareHighlightedEntryInfo(entryIndex) {
//             var timelineData = this._timelineData;
//             var node = this._entryNodes[entryIndex];
//             if (!node)
//                 return null;
// 
//             var entryInfo = [];
//             function pushEntryInfoRow(title, text) {
//                 var row = {};
//                 row.title = title;
//                 row.text = text;
//                 entryInfo.push(row);
//             }
// 
//             var name = WebInspector.beautifyFunctionName(node.functionName);
//             pushEntryInfoRow(WebInspector.UIString("Name"), name);
//             var selfTime = this._millisecondsToString(this._entrySelfTimes[entryIndex]);
//             var totalTime = this._millisecondsToString(timelineData.entryTotalTimes[entryIndex]);
//             pushEntryInfoRow(WebInspector.UIString("Self time"), selfTime);
//             pushEntryInfoRow(WebInspector.UIString("Total time"), totalTime);
//             var text = this._target ? WebInspector.Linkifier.liveLocationText(this._target, node.scriptId, node.lineNumber, node.columnNumber) : node.url;
//             pushEntryInfoRow(WebInspector.UIString("URL"), text);
//             pushEntryInfoRow(WebInspector.UIString("Aggregated self time"), Number.secondsToString(node.selfTime / 1000, true));
//             pushEntryInfoRow(WebInspector.UIString("Aggregated total time"), Number.secondsToString(node.totalTime / 1000, true));
//             if (node.deoptReason && node.deoptReason !== "no reason")
//                 pushEntryInfoRow(WebInspector.UIString("Not optimized"), node.deoptReason);
// 
//             return entryInfo;
        }

        /**
         * @param {number} entryIndex
         * @return {boolean}
         */
        canJumpToEntry(entryIndex) {
            //return this._entryNodes[entryIndex].scriptId !== "0";
        }

        /**
         * @param {number} entryIndex
         * @return {string}
         */
        entryTitle(entryIndex) {
            // var node = this._entryNodes[entryIndex];
            // return WebInspector.beautifyFunctionName(node.functionName);
        }

        /**
         * @param {number} entryIndex
         * @return {?string}
         */
        entryFont(entryIndex) {
            // if (!this._font) {
            //     this._font = (this.barHeight() - 4) + "px " + WebInspector.fontFamily();
            //     this._boldFont = "bold " + this._font;
            // }
            // var node = this._entryNodes[entryIndex];
            // var reason = node.deoptReason;
            // return (reason && reason !== "no reason") ? this._boldFont : this._font;
        }

        /**
         * @param {number} entryIndex
         * @return {string}
         */
        entryColor(entryIndex) {
            // var node = this._entryNodes[entryIndex];
            // return this._colorGenerator.colorForID(node.functionName + ":" + node.url);
        }

        /**
         * @param {number} entryIndex
         * @param {!CanvasRenderingContext2D} context
         * @param {?string} text
         * @param {number} barX
         * @param {number} barY
         * @param {number} barWidth
         * @param {number} barHeight
         * @param {function(number):number} timeToPosition
         * @return {boolean}
         */
        decorateEntry(entryIndex, context, text, barX, barY, barWidth, barHeight, timeToPosition) {
            return false;
        }

        /**
         * @param {number} entryIndex
         * @return {boolean}
         */
        forceDecoration(entryIndex) {
            return false;
        }

        /**
         * @param {number} entryIndex
         * @return {!{startTime: number, endTime: number}}
         */
        highlightTimeRange(entryIndex) {
            // var startTime = this._timelineData.entryStartTimes[entryIndex];
            // return {
            //     startTime: startTime,
            //     endTime: startTime + this._timelineData.entryTotalTimes[entryIndex]
            // };
        }

        /**
         * @return {number}
         */
        paddingLeft() {
            return 15;
        }

        /**
         * @param {number} entryIndex
         * @return {string}
         */
        textColor(entryIndex) {
            return "#333";
        }
    }
}


/**
 *  cpuprofile界面中的上面的曲线部分。 
 *  层次结构
 *      view.element
 *          _overviewPane:曲线图
 *          _mainPane : FlameChart
 */
class CPUProfileFlameChart extends WebInspector.VBox{
    _dataProvider:WebInspector.FlameChartDataProvider
    _searchResults:Array<any>;
    _overviewPane:CPUProfileFlameChart_OverviewPane=null;
    _mainPane:WebInspector.FlameChart;
    _searchResultIndex:any;
    /**
     * @constructor
     * @implements {WebInspector.CPUProfileView.Searchable}
     * @extends {WebInspector.VBox}
     * @param {!WebInspector.FlameChartDataProvider} dataProvider
     */
    constructor(dataProvider:WebInspector.FlameChartDataProvider){
        super();
        this.element.id='cpu-flame-chart';
        this._overviewPane = new CPUProfileFlameChart_OverviewPane(dataProvider);
        this._overviewPane.show(this.element);
 
        this._mainPane = new WebInspector.FlameChart(dataProvider, this._overviewPane, true);
        this._mainPane.show(this.element);
        this._mainPane.addEventListener(WebInspector.FlameChart.Events.EntrySelected, this._onEntrySelected, this);
        this._overviewPane.addEventListener(WebInspector.OverviewGrid.Events.WindowChanged, this._onWindowChanged, this);
        this._dataProvider = dataProvider;
        this._searchResults = [];
    }


    focus() {
        this._mainPane.focus();
    }

    /**
     * @param {!WebInspector.Event} event
     */
    _onWindowChanged(event) {
        var windowLeft = event.data.windowTimeLeft;
        var windowRight = event.data.windowTimeRight;
        //this._mainPane.setWindowTimes(windowLeft, windowRight);
    }

    /**
     * @param {number} timeLeft
     * @param {number} timeRight
     */
    selectRange(timeLeft, timeRight) {
        this._overviewPane._selectRange(timeLeft, timeRight);
    }

    /**
     * @param {!WebInspector.Event} event
     */
    _onEntrySelected(event) {
        //this.dispatchEventToListeners(WebInspector.FlameChart.Events.EntrySelected, event.data);
    }

    update() {
        this._overviewPane.update();
        this._mainPane.update();
    }

    /**
     * @param {!WebInspector.SearchableView.SearchConfig} searchConfig
     * @param {boolean} shouldJump
     * @param {boolean=} jumpBackwards
     * @return {number}
     */
    performSearch(searchConfig, shouldJump, jumpBackwards) {
//         var matcher = createPlainTextSearchRegex(searchConfig.query, searchConfig.caseSensitive ? "" : "i");
// 
//         var selectedEntryIndex = this._searchResultIndex !== -1 ? this._searchResults[this._searchResultIndex] : -1;
//         this._searchResults = [];
//         var entriesCount = this._dataProvider._entryNodes.length;
//         for (var index = 0; index < entriesCount; ++index) {
//             if (this._dataProvider.entryTitle(index).match(matcher))
//                 this._searchResults.push(index);
//         }
// 
//         if (this._searchResults.length) {
//             this._searchResultIndex = this._searchResults.indexOf(selectedEntryIndex);
//             if (this._searchResultIndex === -1)
//                 this._searchResultIndex = jumpBackwards ? this._searchResults.length - 1 : 0;
//             this._mainPane.setSelectedEntry(this._searchResults[this._searchResultIndex]);
//         } else
//             this.searchCanceled();
// 
//         return this._searchResults.length;
    }

    searchCanceled() {
        //this._mainPane.setSelectedEntry(-1);
        this._searchResults = [];
        this._searchResultIndex = -1;
    }

    jumpToNextSearchResult() {
        this._searchResultIndex = (this._searchResultIndex + 1) % this._searchResults.length;
        //this._mainPane.setSelectedEntry(this._searchResults[this._searchResultIndex]);
    }

    jumpToPreviousSearchResult() {
        this._searchResultIndex = (this._searchResultIndex - 1 + this._searchResults.length) % this._searchResults.length;
        //this._mainPane.setSelectedEntry(this._searchResults[this._searchResultIndex]);
    }

    /**
     * @return {number}
     */
    currentSearchResultIndex() {
        return this._searchResultIndex;
    }

};

/**
 * @constructor
 * @implements {WebInspector.TimelineGrid.Calculator}
 */
class CPUProfileFlameChart_OverviewCalculator{
    _minimumBoundaries:number;
    _maximumBoundaries:number;
    _xScaleFactor:number;
    /**
     * @return {number}
     */
    paddingLeft() {
        return 0;
    }

    /**
     * @param {!WebInspector.CPUProfileFlameChart.OverviewPane} overviewPane
     */
    _updateBoundaries(overviewPane) {
        this._minimumBoundaries = overviewPane._dataProvider.minimumBoundary();
        var totalTime = overviewPane._dataProvider.totalTime();
        this._maximumBoundaries = this._minimumBoundaries + totalTime;
        this._xScaleFactor = overviewPane._overviewContainer.clientWidth / totalTime;
    }

    /**
     * @param {number} time
     * @return {number}
     */
    computePosition(time) {
        return (time - this._minimumBoundaries) * this._xScaleFactor;
    }

    /**
     * @param {number} value
     * @param {number=} precision
     * @return {string}
     */
    formatTime(value, precision) {
        //return Number.secondsToString((value - this._minimumBoundaries) / 1000);
    }

    /**
     * @return {number}
     */
    maximumBoundary() {
        return this._maximumBoundaries;
    }

    /**
     * @return {number}
     */
    minimumBoundary() {
        return this._minimumBoundaries;
    }

    /**
     * @return {number}
     */
    zeroTime() {
        return this._minimumBoundaries;
    }

    /**
     * @return {number}
     */
    boundarySpan() {
        return this._maximumBoundaries - this._minimumBoundaries;
    }
}


/**
 * 画cpuprofile上半部的曲线。
 * 层次结构
 *   _overviewContainer：Div
 *      _overviewCanvas:Canvas pos:0,20
 *      _overviewGrid:
 */
class CPUProfileFlameChart_OverviewPane extends WebInspector.VBox{
    _overviewContainer:HTMLElement;
    _dataProvider:WebInspector.FlameChartDataProvider;
    _overviewGrid:any;
    _overviewCanvas:HTMLCanvasElement;
    _overviewCalculator:any;
    _updateTimerId:number;
    
    constructor(dataProvider:WebInspector.FlameChartDataProvider){
        super();
        this.element.classList.add("cpu-profile-flame-chart-overview-pane");
        this._overviewContainer = this.element.createChild("div", "cpu-profile-flame-chart-overview-container");
        this._overviewGrid = new WebInspector.OverviewGrid("cpu-profile-flame-chart");
        this._overviewGrid.element.classList.add("fill");
        this._overviewCanvas = <HTMLCanvasElement>this._overviewContainer.createChild("canvas", "cpu-profile-flame-chart-overview-canvas");
        this._overviewContainer.appendChild(this._overviewGrid.element);
        //this._overviewCalculator = new WebInspector.CPUProfileFlameChart.OverviewCalculator();
        this._dataProvider = dataProvider;
        this._overviewGrid.addEventListener(WebInspector.OverviewGrid.Events.WindowChanged, this._onWindowChanged, this);
    }
    /**
     * @param {number} windowStartTime
     * @param {number} windowEndTime
     */
    requestWindowTimes(windowStartTime, windowEndTime) {
        this._selectRange(windowStartTime, windowEndTime);
    }

    /**
     * @param {number} startTime
     * @param {number} endTime
     */
    updateBoxSelection(startTime, endTime) {
    }

    /**
     * @param {number} timeLeft
     * @param {number} timeRight
     */
    _selectRange(timeLeft, timeRight) {
        var startTime = this._dataProvider.minimumBoundary();
        var totalTime = this._dataProvider.totalTime();
        this._overviewGrid.setWindow((timeLeft - startTime) / totalTime, (timeRight - startTime) / totalTime);
    }

    /**
     * @param {!WebInspector.Event} event
     */
    _onWindowChanged(event) {
        var startTime = this._dataProvider.minimumBoundary();
        var totalTime = this._dataProvider.totalTime();
        var data = {
            windowTimeLeft: startTime + this._overviewGrid.windowLeft() * totalTime,
            windowTimeRight: startTime + this._overviewGrid.windowRight() * totalTime
        };
        //this.dispatchEventToListeners(WebInspector.OverviewGrid.Events.WindowChanged, data);
    }

    /**
     * @return {?WebInspector.FlameChart.TimelineData}
     */
    _timelineData() {
        return this._dataProvider.timelineData();
    }

    onResize() {
        this._scheduleUpdate();
    }

    _scheduleUpdate() {
        if (this._updateTimerId)
            return;
        //this._updateTimerId = this.element.window().requestAnimationFrame(this.update.bind(this));
    }

    update() {
        this._updateTimerId = 0;
        var timelineData = this._timelineData();
        if (!timelineData)
            return;
        //canvas上面要保留20像素的空间，控制范围
        this._resetCanvas(this._overviewContainer.clientWidth, this._overviewContainer.clientHeight - WebInspector.FlameChart.DividersBarHeight);
        this._overviewCalculator._updateBoundaries(this);
        this._overviewGrid.updateDividers(this._overviewCalculator);
        this._drawOverviewCanvas();
    }

    _drawOverviewCanvas() {
        var canvasWidth = this._overviewCanvas.width;
        var canvasHeight = this._overviewCanvas.height;
        var drawData = this._calculateDrawData(canvasWidth);
        var context = this._overviewCanvas.getContext("2d");
        var ratio = window.devicePixelRatio;
        var offsetFromBottom = ratio;
        var lineWidth = 1;
        var yScaleFactor = canvasHeight / (this._dataProvider.maxStackDepth() * 1.1);
        context.lineWidth = lineWidth;
        context.translate(0.5, 0.5);
        context.strokeStyle = "rgba(20,0,0,0.4)";
        context.fillStyle = "rgba(214,225,254,0.8)";
        context.moveTo(-lineWidth, canvasHeight + lineWidth);
        context.lineTo(-lineWidth, Math.round(canvasHeight - drawData[0] * yScaleFactor - offsetFromBottom));
        var value;
        for (var x = 0; x < canvasWidth; ++x) {
            value = Math.round(canvasHeight - drawData[x] * yScaleFactor - offsetFromBottom);
            context.lineTo(x, value);
        }
        context.lineTo(canvasWidth + lineWidth, value);
        context.lineTo(canvasWidth + lineWidth, canvasHeight + lineWidth);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * @param {number} width
     * @return {!Uint8Array}
     */
    _calculateDrawData(width:number):Uint8Array {
        var dataProvider = this._dataProvider;
        var timelineData = this._timelineData();
        var entryStartTimes = timelineData.entryStartTimes;
        var entryTotalTimes = timelineData.entryTotalTimes;
        var entryLevels = timelineData.entryLevels;
        var length = entryStartTimes.length;
        var minimumBoundary = this._dataProvider.minimumBoundary();

        var drawData = new Uint8Array(width);
        var scaleFactor = width / dataProvider.totalTime();

        for (var entryIndex = 0; entryIndex < length; ++entryIndex) {
            var start = Math.floor((entryStartTimes[entryIndex] - minimumBoundary) * scaleFactor);
            var finish = Math.floor((entryStartTimes[entryIndex] - minimumBoundary + entryTotalTimes[entryIndex]) * scaleFactor);
            for (var x = start; x <= finish; ++x)
                drawData[x] = Math.max(drawData[x], entryLevels[entryIndex] + 1);
        }
        return drawData;
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    _resetCanvas(width, height) {
        var ratio = window.devicePixelRatio;
        this._overviewCanvas.width = width * ratio;
        this._overviewCanvas.height = height * ratio;
        this._overviewCanvas.style.width = width + "px";
        this._overviewCanvas.style.height = height + "px";
    }

}
