
module WebInspector{
    class CPUProfilerModel extends SDKModel{
        
        static EventTypes = {
            ProfileStarted: "ProfileStarted",
            ProfileStopped: "ProfileStopped",
            ConsoleProfileStarted: "ConsoleProfileStarted",
            ConsoleProfileFinished: "ConsoleProfileFinished"
        };
                
        constructor(target:WebInspector.Target){
            super(CPUProfilerModel,target);
        }
    }
}