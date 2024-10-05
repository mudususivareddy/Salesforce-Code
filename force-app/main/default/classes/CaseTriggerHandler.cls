public class CaseTriggerHandler {
    
    public static void run( System.TriggerOperation operationType ) {
        
        switch on operationType {
            when BEFORE_INSERT {
                beforeInsert(Trigger.New);
            }
            when AFTER_INSERT {
                afterInsert(Trigger.New , Trigger.newMap);
            }
            when BEFORE_UPDATE{
                beforeUpdate(Trigger.newMap, Trigger.oldMap );
            }
            when AFTER_UPDATE{
                afterUpdate(Trigger.newMap, Trigger.oldMap );
            }
            when BEFORE_DELETE{
                beforeDelete(Trigger.old, Trigger.oldMap );
            }
            when AFTER_DELETE{
                afterDelete(Trigger.oldMap);
            }
            when AFTER_UNDELETE{
                afterUnDelete(Trigger.New , Trigger.newMap);
            }
        }
    }
    
    public static void beforeInsert(List<sObject> newRecordsList){
          //ContactTriggerHelper.checkDuplicate ((List<Contact>)newRecordsList);
    }

    public static void afterInsert(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap){
        List<Case> contactList = (List<Case>)newRecordsList;
        CaseTriggerHelper.updateCount(contactList,( Map<Id, Case>)newRecordsMap);
    }

    public static void beforeUpdate(Map<Id, sObject> newRecordsMap, Map<Id, sObject> oldRecordsMap){
        //ContactTriggerHelper.checkDuplicate ((List<Contact>)newRecordsMap.values());
    }

    public static void afterUpdate(Map<Id, sObject> newRecordsMap,  Map<Id, sObject> oldRecordsMap){
        /*List<Case> contactList = new List<Case>();
        List<Case> existingRecors = (List<Case>)newRecordsMap.values();
        for (Case con : existingRecors ) {
            Case oldContact = (Case)oldRecordsMap.get(con.Id);
            if ( oldContact.ParentId != con.ParentId ) {
                contactList.add(con);
            }
        }*/
        CaseTriggerHelper.updateCount(newRecordsMap.values(),( Map<Id, Case>)oldRecordsMap);
    }
          
    public static void beforeDelete(List<sObject> oldRecordsList , Map<Id, sObject> oldRecordsMap){
        
    }

    public static void afterDelete(Map<Id, sObject> oldRecordsMap){
        List<Contact> contactList = (List<Contact>)oldRecordsMap.values();
        //ContactTriggerHelper.updateCount(contactList);
    }
    
    public static void afterUnDelete(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap) {
        List<Contact> contactList = (List<Contact>)newRecordsList;
        //ContactTriggerHelper.updateCount(contactList);
        //ContactTriggerHelper.checkDuplicate (contactList);
    }
}