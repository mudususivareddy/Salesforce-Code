import { LightningElement } from 'lwc';
import uploadChunk from '@salesforce/apex/FileUploadController.uploadChunk';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUploadToS3 extends LightningElement {
		file;
    CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB
    uploadedSize = 0;
    
    handleFileChange(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            this.uploadFile();
        }
    }

    async uploadFile() {
        const totalChunks = Math.ceil(this.file.size / this.CHUNK_SIZE);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * this.CHUNK_SIZE;
            const end = Math.min(start + this.CHUNK_SIZE, this.file.size);
            const fileChunk = this.file.slice(start, end);

            const reader = new FileReader();

            reader.onloadend = async () => {
                const fileContents = reader.result;
                const base64Chunk = fileContents.split(',')[1]; // Remove metadata

                try {
                    const result = await uploadChunk({
                        fileName: this.file.name,
                        chunkData: base64Chunk,
                        chunkIndex: chunkIndex,
                        totalChunks: totalChunks
                    });

                    this.uploadedSize += end - start;
                    this.showToast('Chunk uploaded', `Uploaded ${this.uploadedSize} of ${this.file.size}`, 'success');
                    
                    if (this.uploadedSize === this.file.size) {
                        this.showToast('File Upload Complete', 'File uploaded successfully to S3.', 'success');
                    }
                } catch (error) {
                    this.showToast('Error', 'File upload failed', 'error');
                }
            };

            reader.readAsDataURL(fileChunk);
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}