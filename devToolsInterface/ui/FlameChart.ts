
module WebInspector {
    export interface FlameChartDelegate {
        /**
         * @param {number} startTime
         * @param {number} endTime
         */
        requestWindowTimes(startTime:number, endTime:number);

        /**
         * @param {number} startTime
         * @param {number} endTime
         */
        updateBoxSelection(startTime:number, endTime:number);
    }

    export interface FlameChartDataProvider {
        /**
         * @return {number}
         */
        barHeight();

        /**
         * @param {number} startTime
         * @param {number} endTime
         * @return {?Array.<number>}
         */
        dividerOffsets(startTime, endTime);

        /**
         * @param {number} index
         * @return {string}
         */
        markerColor(index);

        /**
         * @param {number} index
         * @return {string}
         */
        markerTitle(index);

        /**
         * @param {number} index
         * @return {boolean}
         */
        isTallMarker(index);

        /**
         * @return {number}
         */
        minimumBoundary();

        /**
         * @return {number}
         */
        totalTime();

        /**
         * @return {number}
         */
        maxStackDepth();

        /**
         * @return {?WebInspector.FlameChart.TimelineData}
         */
        timelineData();

        /**
         * @param {number} entryIndex
         * @return {?Array.<!{title: string, text: string}>}
         */
        prepareHighlightedEntryInfo(entryIndex);

        /**
         * @param {number} entryIndex
         * @return {boolean}
         */
        canJumpToEntry(entryIndex);

        /**
         * @param {number} entryIndex
         * @return {?string}
         */
        entryTitle(entryIndex);

        /**
         * @param {number} entryIndex
         * @return {?string}
         */
        entryFont(entryIndex);

        /**
         * @param {number} entryIndex
         * @return {string}
         */
        entryColor(entryIndex);

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
        decorateEntry(entryIndex, context, text, barX, barY, barWidth, barHeight, timeToPosition);

        /**
         * @param {number} entryIndex
         * @return {boolean}
         */
        forceDecoration(entryIndex);

        /**
         * @param {number} entryIndex
         * @return {string}
         */
        textColor(entryIndex);

        /**
         * @return {number}
         */
        textBaseline();

        /**
         * @return {number}
         */
        textPadding();

        /**
         * @return {?{startTime: number, endTime: number}}
         */
        highlightTimeRange(entryIndex);

        /**
         * @return {number}
         */
        paddingLeft();
    }

    class FlameChart extends WebInspector.VBox {
        _flameChartDelegate:FlameChartDelegate;
        _isTopDown=false;
        _canvas:HTMLCanvasElement;
        constructor(dataProvider: FlameChartDataProvider, flameChartDelegate: FlameChartDelegate, isTopDown: boolean) {
            super(true);
            this.registerRequiredCSS("ui/flameChart.css");
            this.contentElement.classList.add("flame-chart-main-pane");
            this._flameChartDelegate = flameChartDelegate;
            this._isTopDown = isTopDown;
            
            //this._calculator = new WebInspector.FlameChart.Calculator();

            this._canvas = <HTMLCanvasElement>this.contentElement.createChild("canvas");
            this._canvas.tabIndex = 1;
            this.setDefaultFocusedElement(this._canvas);
            this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this), false);
            this._canvas.addEventListener("mousewheel", this._onMouseWheel.bind(this), false);
            this._canvas.addEventListener("click", this._onClick.bind(this), false);
            this._canvas.addEventListener("keydown", this._onKeyDown.bind(this), false);
            //WebInspector.installDragHandle(this._canvas, this._startCanvasDragging.bind(this), this._canvasDragging.bind(this), this._endCanvasDragging.bind(this), "move", null);
            
        }
        
        _onMouseMove(event:Event){
        }
        _onMouseWheel(event:Event){
            
        }
        _onClick(event:Event){
            
        }
        _onKeyDown(event:Event){
            
        }
    }
}