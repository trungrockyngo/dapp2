/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

async function getCollectionName(ctx) {
    const mspid = ctx.clientIdentity.getMSPID();
    const collectionName = `_implicit_org_${mspid}`;
    return collectionName;
}

class TenderingContract extends Contract {

    async tenderingExists(ctx, tenderingId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, tenderingId);
        return (!!data && data.length > 0);
    }

    async createTendering(ctx, tenderingId) {
        const exists = await this.tenderingExists(ctx, tenderingId);
        if (exists) {
            throw new Error(`The asset tendering ${tenderingId} already exists`);
        }

        const privateAsset = {};

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || !transientData.has('privateValue')) {
            throw new Error('The privateValue key was not specified in transient data. Please try again.');
        }
        privateAsset.privateValue = transientData.get('privateValue').toString();

        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(collectionName, tenderingId, Buffer.from(JSON.stringify(privateAsset)));
    }

    async readTendering(ctx, tenderingId) {
        const exists = await this.tenderingExists(ctx, tenderingId);
        if (!exists) {
            throw new Error(`The asset tendering ${tenderingId} does not exist`);
        }
        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, tenderingId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }

    async updateTendering(ctx, tenderingId) {
        const exists = await this.tenderingExists(ctx, tenderingId);
        if (!exists) {
            throw new Error(`The asset tendering ${tenderingId} does not exist`);
        }
        const privateAsset = {};

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || !transientData.has('privateValue')) {
            throw new Error('The privateValue key was not specified in transient data. Please try again.');
        }
        privateAsset.privateValue = transientData.get('privateValue').toString();

        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(collectionName, tenderingId, Buffer.from(JSON.stringify(privateAsset)));
    }

    async deleteTendering(ctx, tenderingId) {
        const exists = await this.tenderingExists(ctx, tenderingId);
        if (!exists) {
            throw new Error(`The asset tendering ${tenderingId} does not exist`);
        }
        const collectionName = await getCollectionName(ctx);
        await ctx.stub.deletePrivateData(collectionName, tenderingId);
    }

    async verifyTendering(ctx, mspid, tenderingId, objectToVerify) {

        // Convert provided object into a hash
        const hashToVerify = crypto.createHash('sha256').update(objectToVerify).digest('hex');
        const pdHashBytes = await ctx.stub.getPrivateDataHash(`_implicit_org_${mspid}`, tenderingId);
        if (pdHashBytes.length === 0) {
            throw new Error('No private data hash with the key: ' + tenderingId);
        }

        const actualHash = Buffer.from(pdHashBytes).toString('hex');

        // Compare the hash calculated (from object provided) and the hash stored on public ledger
        if (hashToVerify === actualHash) {
            return true;
        } else {
            return false;
        }
    }


}

module.exports = TenderingContract;
