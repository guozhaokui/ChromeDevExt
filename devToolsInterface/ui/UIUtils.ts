

module WebInspector{
    function setCurrentFocusElement(x:HTMLElement) {
        /*
        if (WebInspector._glassPane && x && !WebInspector._glassPane.element.isAncestor(x))
            return;
        if (WebInspector._currentFocusElement !== x)
            WebInspector._previousFocusElement = WebInspector._currentFocusElement;
        WebInspector._currentFocusElement = x;

        if (WebInspector._currentFocusElement) {
            WebInspector._currentFocusElement.focus();

            // Make a caret selection inside the new element if there isn't a range selection and there isn't already a caret selection inside.
            // This is needed (at least) to remove caret from console when focus is moved to some element in the panel.
            // The code below should not be applied to text fields and text areas, hence _isTextEditingElement check.
            var selection = x.window().getSelection();
            if (!WebInspector._isTextEditingElement(WebInspector._currentFocusElement) && selection.isCollapsed && !WebInspector._currentFocusElement.isInsertionCaretInside()) {
                var selectionRange = WebInspector._currentFocusElement.ownerDocument.createRange();
                selectionRange.setStart(WebInspector._currentFocusElement, 0);
                selectionRange.setEnd(WebInspector._currentFocusElement, 0);

                selection.removeAllRanges();
                selection.addRange(selectionRange);
            }
        } else if (WebInspector._previousFocusElement)
            WebInspector._previousFocusElement.blur();
        */
    }
    
    /**
     * @param {!Window} window
     * @param {!Function} func 每次动画调用的函数,参数是一个数组
     * @param {!Array.<{from:number, to:number}>} params
     * @param {number} frames
     * @param {function()=} animationComplete
     * @return {function()} 返回一个cancel函数。
     */
    interface __animparam{from:number,to:number};
    export function animateFunction(window:Window, func:(vals:Array<__animparam>)=>void, 
            params:Array<__animparam>, frames:number, 
            animationComplete:()=>void):()=>void{
        var values = new Array(params.length);
        var deltas = new Array(params.length);
        for (var i = 0; i < params.length; ++i) {
            values[i] = params[i].from;
            deltas[i] = (params[i].to - params[i].from) / frames;
        }

        var raf = window.requestAnimationFrame(animationStep);

        var framesLeft = frames;

        function animationStep() {
            if (--framesLeft < 0) {
                if (animationComplete)
                    animationComplete();
                return;
            }
            for (var i = 0; i < params.length; ++i) {
                if (params[i].to > params[i].from)
                    values[i] = Number['constrain'](values[i] + deltas[i], params[i].from, params[i].to);
                else
                    values[i] = Number['constrain'](values[i] + deltas[i], params[i].to, params[i].from);
            }
            func.apply(null, values);
            raf = window.requestAnimationFrame(animationStep);
        }

        function cancelAnimation(){
            window.cancelAnimationFrame(raf);
        }

        return cancelAnimation;
    }        
}