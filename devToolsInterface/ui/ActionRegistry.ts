
module WebInspector {
    class ActionRegistry {
        constructor() {

        }
        _registerActions(): void {
            
        }

        static ActionDelegate = class {
            /**
             * @param {!WebInspector.Context} context
             * @return {boolean} True if handled. Note that lazily loaded modules won't be able to consume
             *                   platform events from their actions.
             */
            handleAction(context: any): boolean {
                return false;
            }
        }
    }
}