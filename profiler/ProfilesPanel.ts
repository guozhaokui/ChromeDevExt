
module WebInspector{
    interface ProfileType_DataDisplayDelegate{
        
    }
    export class ProfileType extends WebInspector.Object{
        
        static Events = {
            AddProfileHeader: "add-profile-header",
            ProfileComplete: "profile-complete",
            RemoveProfileHeader: "remove-profile-header",
            ViewUpdated: "view-updated"
        }
        
        constructor(id:string, name:string){
            super();
        }
        
        static DataDisplayDelegate=class {
            
        }
    }
    
    export class ProfileHeader extends WebInspector.Object{
    }
    
    export class ProfilesPanel implements ProfileType_DataDisplayDelegate{
        
    }
}