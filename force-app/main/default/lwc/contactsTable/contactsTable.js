import { LightningElement, api, wire, track } from 'lwc';
import getContact from '@salesforce/apex/ContactsTableController.getContact';


const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'First name', fieldName: 'FirstName'},
    { label: 'Last name', fieldName: 'LastName'},
    { label: 'Email', fieldName: 'Email', type: 'url'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
];

const RECORD_ON_PAGE = 5;

export default class ContactsTable extends LightningElement {
    @track contactsView = [];
    @track contacts = [];
    @api columns = COLUMNS;

    haveData = false;
    searchKey;
    error;
    page;
    wiredData;
    loaded;

    connectedCallback() {
        this.page = 1;
    }

    @wire(getContact, {searchKey: '$searchKey'})
    getContactApex(result) {
        this.loaded = false;
        this.wiredData = result;
        if (this.wiredData.data) {
            this.contacts = [];
            for (let i = 1; i < this.wiredData.data.length; i++) {
                let currentPage = Math.ceil(i/RECORD_ON_PAGE);
                let page = this.contacts.find(item => item.numPage === currentPage);
                if (page) {
                    page.records.push(this.wiredData.data[i-1]);
                } else {
                    this.contacts.push({'numPage' : currentPage, 'records' : [this.wiredData.data[i-1]]});
                }
            }
            this.getView();
        } else {
            this.error = this.wiredData.error;
        }
    }

    getView() {
        if (this.contacts.length > 0) {
            this.contactsView = this.contacts.find(item => item.numPage === this.page).records;
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
}