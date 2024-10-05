import { LightningElement,api } from 'lwc';
export default class FileUploader extends LightningElement {
		@api recordId; // recordId for which files will be attached
    //@api allowMultiple = true; // to allow multiple file uploads
    uploadedFiles = []; // stores the uploaded files list

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        uploadedFiles.forEach(file => {
            uploadedFileNames += file.name + ', ';
        });

        this.uploadedFiles = [...uploadedFiles];
        // Log the file names in the console for debugging
        console.log('Uploaded Files: ', uploadedFileNames);
    }
}