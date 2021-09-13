import { LightningElement, wire, track } from "lwc";
import getAccounts from "@salesforce/apex/AccountsTableController.getAccounts";
import { sortByName } from "c/sortByName";

export default class AccountsTable extends LightningElement {
    @track accountsView = [];

    wiredData;
    asc = true;
    haveData = false;

    @wire(getAccounts)
    getAccountsApex(result) {
        this.wiredData = result;
        if (this.wiredData.data) {
            this.accountsView = this.wiredData.data;
            this.haveData = true;
        }
    }

    getSort() {
        this.asc = !this.asc;
        this.accountsView = sortByName(this.accountsView, this.asc);
    }
}
