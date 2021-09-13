public with sharing class AccountsTableController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [SELECT Name, Website FROM Account ORDER BY Name];
  }
}
