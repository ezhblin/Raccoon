import { LightningElement, api} from 'lwc';

export default class Paggination extends LightningElement {
    @api recordCount;
    
    clickPagginationButton () {
        const event = CustomEvent('switchpage', {detail: this.recordCount});
        this.dispatchEvent(event);
    }
}