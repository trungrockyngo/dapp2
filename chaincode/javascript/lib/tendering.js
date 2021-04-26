/*
 * Copyright Tenderbullet. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 * @trungrockyngo
 * NOTE: currently basic one chaincode - Tendering 
 * TO-DO: need to find the code structure to bridge multiple chaincodes as per proposed in requirement 
 * DEV: 
 * 1/ currently, use global state variable tenderID to bypass initLedger() for the critical sake of not needing to 
 * invoke initLedger() in other major architectural layers 
 * 2/ modifyTender() - as per unpolished business logic, modifyTender is equivalent to republishTender(), but what specific
 * in tendering's request so that can be passed in as it params 
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const moment = require('moment'); 

class Tendering extends Contract {

    tenderID = 0 
    templateID = 0

    async createTender(ctx, _creator, _bidder, _amount, _country, _city, _beneficiary, _manager, _expectedRisk) {
        console.info('============= START : Create Tendering ===========');
        
        this.tenderID++; 
        
        const recordTenderID = "TEND"+ this.tenderID;
        const tender = {
            tenderID: recordTenderID, 
            docType: "tender", 
            creator: _creator,
            investor: {
                name: _bidder, 
                amount: _amount, 
            }, 
            location: {
                city: _city, 
                country: _country
            },
            beneficiary: _beneficiary, 
            expectedRisk: _expectedRisk, 
            manager: _manager
        }

        await ctx.stub.putState(recordTenderID, Buffer.from(JSON.stringify(tender)));
        console.info('============= END : Create Tendering ===========');
    }

    
    async approveTender(ctx, _tenderID, _manager) {
        console.info('============= START : Update tender ===========');

        const tenderAsBytes = await ctx.stub.getState(_tenderID);
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        tender.isApproved = true; 
        
        await ctx.stub.putState(tenderID, Buffer.from(JSON.stringify(tender)));
        console.info('============= END : Update tender ===========');
    }

    async submitTenderTemplate(ctx, template) {
        console.info('============= START : Submit Tendering Document ===========');
        
        this.templateID++; 
        const recordTemplateID = "TEMPLATE"+ this.templateID;
        
        await ctx.stub.putState(recordTemplateID, Buffer.from(JSON.stringify(templateID, template)));

        console.info('============= END : End Submit Tendering Template ===========');
    }

    async setClosingDate(ctx, _tenderID, _manager, _day, _month, _year) {
        console.info('============= START : Set closing date ===========');
        const tenderAsBytes = await ctx.stub.getState(_tenderID);
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        if (tender.manager !== _manager) {
            throw new Error(`the current manager is belonged to this tender. Please try with the correct one!`);
        }
         
        tender.fullDate = moment(`${_year}${_month}${_day}`); 
        await ctx.stub.putState(tenderID, Buffer.from(JSON.stringify(tender)));

        console.info('============= END : Set closing date  ===========');
    } 

    async setOpeningDate(ctx, _tenderID, _manager, _day, _month, _year) {
        console.info('============= START : Set opening date  ===========');

        const tenderAsBytes = await ctx.stub.getState(_tenderID);
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        if (tender.manager !== _manager) {
            throw new Error(`the current manager is belonged to this tender. Please try with the correct one!`);
        }
         
        tender.fullDate = moment(`${_year}${_month}${_day}`); 
        await ctx.stub.putState(tenderID, Buffer.from(JSON.stringify(tender)));
        console.info('============= END : Set opening date  ===========');
    } 

    async getBidder(ctx, _tenderID) {
        console.info('============= START : Get creator from the current tender  ===========');

        const tenderAsBytes = await ctx.stub.getState(_tenderID);
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        console.info('============= END : Get creator from the current tender ===========');
        return tender.investor.name; 
    } 

    async getAmount(ctx, _tenderID) {
        console.info('============= START : Get creator from the current tender  ===========');

        const tenderAsBytes = await ctx.stub.getState(_tenderID);
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        console.info('============= END : Get creator from the current tender ===========');
        return tender.investor.amount; 
    } 

    async getCreator(ctx, _tenderID) {
        console.info('============= START : Get creator from the current tender  ===========');

        const tenderAsBytes = await ctx.stub.getState(_tenderID);
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        console.info('============= END : Get creator from the current tender ===========');
        return tender.creator; 
    } 

    async getManager(ctx, _tenderID) {
        console.info('============= START : Get manager from the current tender  ===========');
        const tenderAsBytes = await ctx.stub.getState(_tenderID);

        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        console.info('============= END : Get manager from the current tender ===========');
        return tender.manager; 
    }

    async getBeneficiary(ctx, _tenderID) {
        console.info('============= START : Get beneficiary from the current tender  ===========');
        const tenderAsBytes = await ctx.stub.getState(_tenderID);

        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`tenderID ${_tenderID} does not exist`);
        }

        const tender = JSON.parse(tenderAsBytes.toString());
        console.info('============= END : Get beneficiary from the current tender ===========');
        return tender.beneficiary;       
    }

    //NOTE: it'll be for future reference of getting all Tenders would be such a heavy operation 
    async getAllTenders(ctx) {
        console.info('============= START : Get All Tenders ===========');

        let queryString = {
            "selector": {
                "docType":"tender"
            }
        };

        const allResults = [];

        for await (const {key, value} of ctx.stub.getQueryResult(JSON.stringify(queryString))) {
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
        // console.info(allResults);
        console.info('============= END : Get All Tenders ===========');
        return JSON.stringify(allResults);
    }
}

module.exports = Tendering;
