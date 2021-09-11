import { LightningElement, track } from 'lwc';

export default class InputTest extends LightningElement {
    @track myMassageToPage;
    @track massageInBox;

    pressButton() {
        this.myMassageToPage = this.massageInBox;
    }

    setValue(event) {
        this.massageInBox = event.target.value;
    }
}