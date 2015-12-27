

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
}