## Chaincode specifications 

### Tendering 

| Function name | Parameters | Notes |
| ------------- | ---------- | ----- |
| `createTender` |  - `_creator` </br> - `_bidder` </br> - `_manager` </br> - `_projectCost` </br> - `_beneficiary` </br> - `_expectedRisk` </br> - `_city` </br> - `_country` | - initialize a Tender object with its corresponding concatenated id called `recordTenderID` based on this current tentative set of parameters: </br>`bidder`: the name of the bidder bidding in the tendering process 
</br> `_creator`: the name of the tender creator who submits the tendering contract  
</br> `_manager`: the name of the tender manager who manages the tender 
</br> `_bidder`: the name of the tendering bidding investor 
</br> `_amount`: the overall cost for which the project set by the bidding investor `_bidder` in the tendering process  
</br> `_country`: the country where the tendering project is initiated in 
</br> `_city`: the city where the tendering project is initiated in 
</br> `_beneficiary`: the organization or group where the bid is eventually transferred to  
</br> `_expectedRisk`: the expected risk model object of currently at either `Critical` or `Medium` or `Low` needed to be set beforehand 

| `getTemplates` | n/a | - return all the tendering templates   
| `getCreator` | - `_tenderID` | - return the tender creator's name based on the tendering document's id 
| `getManager` | - `_tenderID`| - return the tender manager's name  based on the tendering document's id 
| `approveTender` | - `_tenderID` </br> - `_manager` | - validates whether a parameter `_manager` is belonged to the tender of a paramter `_tenderID`  
| `setClosingDate`| - `_manager`</br> - `_tenderID` </br>  - `date` | - validates whether a tender of `_tenderID` is approved or not, if approved, then set the closing date
| `setOpeningDate`| - `_manager`</br> - `_tenderID`</br>  - `date` | - validates whether a tender of `_tenderID` is approved or not, if approved, then set the opening date

| `submitTenderTemplates`| - `_creator` </br> - `_template` | - submit the template object `_template` will be stored in this ledger 

### Key notes; 
for `createTender`, that aforementioned set of parameters wdefinitely can be given in the long-term plan can be encapsulated in some kind of Document object for more scalable functionalities across TenderBullet just like in the `_template` 

#### Head-up: 
This is a **snippet** of the chaincode specification. For further or at ideal full implementation details, please contact us (Rocky and Joy) for inquiry. 

