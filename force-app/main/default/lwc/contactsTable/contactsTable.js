import { LightningElement, wire, track } from "lwc";
import getContacts from "@salesforce/apex/ContactsTableController.getContacts";
import { sortByName } from "c/sortByName";

const RECORD_ON_PAGE = 5;

export default class ContactsTable extends LightningElement {
    @track contactsView = [];
    @track contacts = [];

    haveData = false;
    searchKey;
    page = 1;
    wiredData;
    loaded;
    asc = true;

    @wire(getContacts, { searchKey: "$searchKey" })
    getContactApex(result) {
        this.loaded = false;
        this.wiredData = result;
        if (this.wiredData.data) {
            this.contacts = [];
            for (let i = 1; i < this.wiredData.data.length; i++) {
                let currentPage = Math.ceil(i / RECORD_ON_PAGE);
                let page = this.contacts.find((item) => item.numPage === currentPage);
                if (page) {
                    page.records.push(this.wiredData.data[i - 1]);
                } else {
                    this.contacts.push({
                        numPage: currentPage,
                        records: [this.wiredData.data[i - 1]]
                    });
                }
            }
            this.getView();
        } else {
            console.log(this.wiredData.error);
        }
    }

    getView() {
        if (this.contacts.length > 0) {
            this.contactsView = this.contacts.find(
                (item) => item.numPage === this.page
            ).records;
        } else {
            this.contactsView = [];
        }
        this.haveData = this.contactsView.length > 0 ? true : false;
        this.loaded = true;
    }

    handleKeyUp(event) {
        this.searchKey = event.target.value;
    }

    turnPage(event) {
        this.page = event.detail;
        this.getView();
    }

    showDetails(event) {
        this.template.querySelector("c-contact-card").viewDetails(event.target.value);

    }

    getSort() {
        this.asc = !this.asc;
        this.contactsView = sortByName(this.contactsView, this.asc);
    }
}
