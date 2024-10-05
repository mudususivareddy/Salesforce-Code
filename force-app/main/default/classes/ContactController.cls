public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Integer limitSize, Integer offsetValue) {
        return [
            SELECT Id, Name, Email, Phone
            FROM Contact
            ORDER BY Name
            LIMIT :limitSize
            OFFSET :offsetValue
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalContactCount() {
        return [SELECT COUNT() FROM Contact];
    }
}