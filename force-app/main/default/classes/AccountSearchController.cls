public with sharing class AccountSearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String actName){
        List<Account> accountList = new List<Account>();
        if(actName!=''){
            String accountName = '%' + actName + '%';
            accountList = [select id,name from Account where name like:accountName WITH SECURITY_ENFORCED];
            system.debug(accountList);
            return accountList;  
        }
        return accountList;
              
    }
}