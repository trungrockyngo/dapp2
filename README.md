# Dapp2 Course Capstone - TenderBullet
Git repo for Submission  - Blockchain powered procurement system 


## Brief description 
### Stakeholder 
| Statekeholder |  Role | 
|---------------|-------|
| Admin | <ul> <li> Create or (*if risk exposed*) remove users </li> <li> Assign user roles </li> </ul> | 
| Chief Vigilance Officer (__CVO__) | <ul></li> Monitor any possible threats</li> <li>Prevent potential risks related to procurement with strong alerts</li> <li>Eliminate any existing risk with affirmative action to collaborate with Admin</li></ul>
| Tender Creator | Create bidding tenders | 
| Bidder | Bid for the contract |
| Tender Manager | Review contract(s) then approve for tenders | 
| Evaluation Commitee | **Evaluate bids in technical auditing and financial analysis**

---

### Course-scoped Business Workflow focus **(tentative)**
__Bid Submission Opens__ ->  __Bid Submission Closes__
 ->  __Bid Evaluation__  ->  __Auditing__


## Tenderbullet's tentative functionalities  
Functions breakdown follows the state machine's fundamentals

### Tender Creator

#### Transition functions 
+ createNewTender()
+ uploadTenderInfoDocuments()
+ sendTenderForApproval()
+ addCorrigendum()
+ republishTender()
+ submitTenderTemplates()

#### Others 
---
### Tender Manager

#### Transition functions 
+ approve()
+ publish()
+ setOpeningDate()
+ setClosingDate()
+ publishBiddingInvitation() //
+ getSubmissions()
+ [justadded] rejectTender() //

#### Others 
+ addTenderCategory()

---

### Bidder

#### Transition functions 
+ uploadSignatureCertificate()
+ submitEarnestMoneyDeposit() //
+ uploadTechDocs()
+ uploadFinDocs()
+ getResults()
+ withdrawBid()
+ resubmitBid()

#### Others 
---
### Bid Evaluation Committee

#### Transition functions 
+ evaluateFinDocs()
+ evaluateTechDocs()
+ assignExperts()
+ approveBestFinalBid()
+ rejectBid()

#### Others 
---
### Chief Vigilance Officer

#### Transition functions 
+ reviewTenderActivity()
+ authorizeTender(isVerified) //
+ provideUIN()

#### Others 
+[justadded] unathorizeTender(risksFound)


## Phase-1 Architecture 

#### Business/Sequence high-level diagram
![business-high-level](documentation/phase-1-business.png?raw=true) 

#### Technlogy Architecture: submitting a bid 
![bid-submssion](documentation/phase-1-bid_submisssion.png?raw=true)

#### Technlogy Architecture: evaluating a bid 
![bid_evaluation](documentation/phase-1-bid_evaluation.png?raw=true)


### RESTful API design

| Endpoint     	| Path            	| HTTP method 	| Query input                                                                   	| Output (w/ Description)                        	|
|--------------	|-----------------	|-------------	|-------------------------------------------------------------------------------	|-------------------------------	|
| /tender     	| /all              | GET         	| None                                                                          	| Object (All tenders)       	|
|              	| /creator       	| GET        	| id                                                                               	|  success/fail (get creator of tender)           	|
|              	| /bidder       	| GET        	| id                                                                               	|  success/fail (get bidder/investor of tender)           	|
|              	| /amount       	| GET        	| id                                                                               	|  success/fail (get corresponding amount of that bidder of tender)           	|
|              	| /manager        	| GET         	| id                                                                            	| success/fail (get manager of tender) 	|
|              	| /beneficiary      | GET         	| id                                                                            	| success/fail (get beneficiary of tender )        |
|              	| /approve          | POST         	| id, <br> manager                                                                  | success/fail (Approve the tender by the manager) | 
|              	| /closeDate        | POST         	| id, <br> manager, <br> day, <br> month, <br> year                                 | success/fail (Set the closing date after validating manager on tender id) 	    |
|              	| /openDate         | POST         	| id, <br> manager, <br> day, <br> month, <br> year                                 | success/fail Set the opening date after validating manager on tender id) 	    |
| /submitTpl     | N/A        | POST         	| template                                                                          | success/fail (Submit one tender template) 	    |

<br>
