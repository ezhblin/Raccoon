/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, track, api } from "lwc";

export default class InputTest extends LightningElement {
    @api myMassageToPage;
    @track massageInBox;

    pressButton() {
        this.myMassageToPage = this.massageInBox;
    }

    setValue(event) {
        this.massageInBox = event.target.value;
    }
}
