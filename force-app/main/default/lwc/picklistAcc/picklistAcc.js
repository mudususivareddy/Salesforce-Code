import { LightningElement, wire, api, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
import StageName_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class PicklistAcc extends LightningElement {
		@track  StageValue;
		@track pickListvalues=[];
		@wire(getObjectInfo, { objectApiName: Account_OBJECT })
    opportunityMetadata;
		//pickListvalues;

// now retriving the StageName picklist values of Opportunity

@wire(getObjectInfo, { objectApiName: Opportunity_OBJECT })

opportunityMetadata;

// now retriving the StageName picklist values of Opportunity

@wire(getPicklistValues,

    {

        recordTypeId: '$opportunityMetadata.data.defaultRecordTypeId', 

        fieldApiName: StageName_FIELD

    }

)
OpportunityPicklist;
	/*	@wire(getPicklistValues, {
        recordTypeId : '$opportunityMetadata.data.defaultRecordTypeId',
        fieldApiName : Account_OBJECT
    })
        wiredPickListValue({ data, error }){
            if(data){
                console.log(` Picklist values are `, data.values);
                this.pickListvalues = data.values;
                this.error = undefined;
            }
            if(error){
                console.log(` Error while fetching Picklist values  ${error}`);
                this.error = error;
                this.pickListvalues = undefined;
            }
        }
		*/
		
//OpportunityPicklist;
handleChange(event) {

    this.StageValue = event.detail.value;
}
}