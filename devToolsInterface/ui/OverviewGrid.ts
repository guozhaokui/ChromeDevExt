
module WebInspector{
    export class OverviewGrid{
        element:HTMLElement;
        static Events = {
           WindowChanged: "WindowChanged"
        }
        constructor(prefix:string){
            this.element = document.createElement("div");
            this.element.id = prefix + "-overview-container";
            //this._grid = new WebInspector.TimelineGrid();
            //this._grid.element.id = prefix + "-overview-grid";
            //this._grid.setScrollAndDividerTop(0, 0);
            //this.element.appendChild(this._grid.element);
            //this._window = new WebInspector.OverviewGrid.Window(this.element, this._grid.dividersLabelBarElement);
        }
    }
}