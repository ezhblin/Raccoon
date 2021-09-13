/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
import { getRecord } from "lightning/uiRecordApi";
import { LightningElement, api, wire, track } from "lwc";

const FIELDS = ["Contact.FirstName", "Contact.LastName", "Contact.Email"];
export default class ContactCard extends LightningElement {
    @track record = [];

    wiredData;
    recordId;
    hideCard = true;

    @wire(getRecord, { recordId: "$recordId", optionalFields: FIELDS })
    getContactInfo(result) {
        this.wiredData = result;
        this.record = [];
        if (this.wiredData.data) {
            let fieldsName = Object.keys(this.wiredData.data.fields);
            fieldsName.map((fieldName) => {
                this.record.push({
                    FieldName: fieldName,
                    Value: this.wiredData.data.fields[fieldName].value
                });
            });
            this.hideCard = false;
        } else {
            this.hideCard = true;
        }
    }

    @api viewDetails(recordId) {
        if (this.recordId === recordId) {
            this.hideCard = !this.hideCard;
        } else {
            this.recordId = recordId;
        }
    }
}
