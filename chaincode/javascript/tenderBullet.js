/*
 * Copyright Tenderbullet. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 * @trungrockyngo
 * NOTE: currently basic one chaincode - TenderCreator 
 * TO-DO: need to find the code structure to bridge multiple chaincodes as per proposed in requirement 
 * DEV: 
 * 1/ currently, use global state variable tenderID to bypass initLedger() for the critical sake of not needing to 
 * invoke initLedger() in other major architectural layers 
 * 2/ modifyTender() - as per unpolished business logic, modifyTender is equivalent to republishTender(), but what specific
 * in tendering's request so that can be passed in as it params 
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class TenderCreator extends Contract {

    // async initLedger(ctx) {
    //     console.info('============= START : Initialize Ledger ===========');
    //     console.info('============= END : Initialize Ledger ===========');
    // }

    tenderID = 0 

    async createTender(ctx, _submittor, _investorName, _amount, _country, _beneficiary) {
        console.info('============= START : Create Car ===========');
        
        this.tenderID++; 
        
        const recordTenderID = "TEND"+ this.tenderID;
        const tender = {
            tenderID: recordTenderID, 
            docType: "tender", 
            submittor: _submittor,
            investor: {
                name: _investorName, 
                amount: _amount, 
                country: _country
            }, 
            beneficiary: _beneficiary
        }

        await ctx.stub.putState(recordTenderID, Buffer.from(JSON.stringify(tender)));
        console.info('============= END : Create Car ===========');
    }

    
    async modifyTender(ctx) {
        /**
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
        */
    }

    async uploadTenderDocuments(ctx) {
        /**
        // Example: queryAllCars
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
        */
        
    }

    async sendTenderForApproval(ctx) {
        console.info('============= START : changeCarOwner ===========');

        // const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        // if (!carAsBytes || carAsBytes.length === 0) {
        //     throw new Error(`${carNumber} does not exist`);
        // }
        // const car = JSON.parse(carAsBytes.toString());
        // car.owner = newOwner;

        // await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        // console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = TenderCreator;
