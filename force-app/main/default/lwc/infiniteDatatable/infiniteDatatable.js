import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import getTotalContactCount from '@salesforce/apex/ContactController.getTotalContactCount';

export default class InfiniteDatatable extends LightningElement {
		@track contacts = [];
    @track columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];
    @track isLoading = false;
    @track totalContacts = 0;
    offset = 0;
    limitSize = 20;

    connectedCallback() {
        // Fetch the total number of contacts on component initialization
        this.loadTotalContactCount();
        this.loadContacts();
    }

    @wire(getTotalContactCount)
    loadTotalContactCount({ error, data }) {
        if (data) {
            this.totalContacts = data;
        } else if (error) {
            console.error('Error fetching total contact count:', error);
        }
    }

    handleLoadMore(event) {
        if (this.contacts.length >= this.totalContacts) {
            // No more data to load
            event.target.isLoading = false;
            return;
        }

        this.isLoading = true;
        this.offset += this.limitSize;
        this.loadContacts();
    }

    loadContacts() {
        getContacts({ limitSize: this.limitSize, offsetValue: this.offset })
            .then(result => {
                this.contacts = [...this.contacts, ...result];
                this.isLoading = false;
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
                this.isLoading = false;
            });
    }
  
}