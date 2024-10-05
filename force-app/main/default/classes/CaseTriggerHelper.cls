public class CaseTriggerHelper {
   public static void updateCount(List<Case> contactList,Map<Id, Case> caseMap ) {
        
        Set<Id> accountIdsSet = new Set<Id>();
        for ( Case con : contactList ) {
            if (con.ParentId != null ){
                accountIdsSet.add(con.ParentId);
            }
        }
       
        Map<Id, Case> accountMap = new Map<Id, Case>();
        List<Case> conList = [Select Id,ClosedDate,CreatedDate,ParentId From Case Where ParentId IN :accountIdsSet ];
        for ( Case c : conList ) {
            if(c.ClosedDate != null ){//|| c.ClosedDate != ''
            if (c.CreatedDate > c.ClosedDate ) {
            throw new IllegalArgumentException('Start date time must be earlier than end date time.');
        }

        
        Long timeDifferenceInMillis = c.ClosedDate.getTime() - c.CreatedDate.getTime();

        
        Decimal timeDifferenceInHours = timeDifferenceInMillis / 3600000.0;
            ////////
            if ( !accountMap.containsKey(c.ParentId) ) {
                accountMap.put(c.ParentId , new Case (Id = c.ParentId, Total_Number_Of_Hours_Worked__c = timeDifferenceInHours ));
            } else {
                Case tempAccount = accountMap.get(c.ParentId);
                tempAccount.Total_Number_Of_Hours_Worked__c += timeDifferenceInHours;
                accountMap.put(c.ParentId , tempAccount );
            }
        }
        }
        //List<Database.SaveResult> saveResult = Database.update(accountMap.values(), false);
        try {
            update accountMap.values();
        } catch(System.Exception ex ){
            //TransactionLogHandler.doHandleException(ex, 'ContactTrigger');
        }
    }
}