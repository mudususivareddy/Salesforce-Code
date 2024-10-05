import { LightningElement,track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSearchController.getAccounts';
export default class Customlookup extends LightningElement {
  @track isModalOpen = false;

  // Method to open the modal
  handleOpenModal() {
      this.isModalOpen = true;
  }

  // Method to close the modal
  handleCloseModal() {
      this.isModalOpen = false;
  }
}