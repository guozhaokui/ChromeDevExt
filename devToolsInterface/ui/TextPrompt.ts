
module WebInspector{
    
    class TextPrompt{
        _proxyElement:HTMLElement;
        _proxyElementDisplay = "inline-block";
        _loadCompletions:any;// = completions;
        _completionStopCharacters:string; 
        static DefaultAutocompletionTimeout=250;
        _autocompletionTimeout = TextPrompt.DefaultAutocompletionTimeout;

        static Events = {
            ItemApplied: "text-prompt-item-applied",
            ItemAccepted: "text-prompt-item-accepted"
        };
        
        constructor(completions, stopCharacters){
            this._loadCompletions = completions;
            this._completionStopCharacters= stopCharacters || " =:[({;,!+-*/&|^<>.";
        }
        
        onKeyDown(event:Event){
            
        }
    }
    
    class TextPromptWithHistory extends TextPrompt{
        _data:Array<string>;
        /**
         * 从1开始的索引。表示在栈中的位置
         */
        _historyOffset:number=1;
        /**
         * Whether to coalesce duplicate items in the history, default is true.
         * @type {boolean}
         */
        _coalesceHistoryDupes = true;
        
        constructor(completions, stopCharacters?:string){
            super(completions,stopCharacters);
        }
    }
}