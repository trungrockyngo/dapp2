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