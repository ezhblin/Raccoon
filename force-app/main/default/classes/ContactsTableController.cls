public with sharing class ContactsTableController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(String searchKey) {
    String key = '%' + searchKey + '%';
    return [
      SELECT Name, FirstName, LastName, Email, Phone, AccountId
      FROM Contact
      WHERE Name LIKE :key
      ORDER BY Name
    ];
  }
}
