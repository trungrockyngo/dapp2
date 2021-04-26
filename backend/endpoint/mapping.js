const fabricConfig = require('./config');
let gateway; 

async function init() {
    let contract;
    
    try {
        const { Wallets } = require('fabric-network');
        const { Gateway } = require('fabric-network');
        const path = require('path');
        const fs = require('fs');
    
        const walletPath = path.join(process.cwd(), fabricConfig.walletFolder);

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        gateway = new Gateway();

        const connectionProfilePath = path.resolve(__dirname, fabricConfig.connProfileFolder, fabricConfig.connProfile);

        const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));

        const connectionOptions = {
            wallet, identity: fabricConfig.walletFile, discovery:
                { enabled: true, asLocalhost: true }
        };

        await gateway.connect(connectionProfile, connectionOptions);        

        const network = await gateway.getNetwork(fabricConfig.channelName);
        
        // Get the contract from the network.
        contract = network.getContract(fabricConfig.contractName);

        console.log('---------------------------- RESULT from backend server --------')

        return contract;
    } catch (error) {
        console.error('Failed to initialize transaction:', error);
        process.exit(1);
    }
}

async function getAllTenders() {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getAllTenders');
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function getBidder(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getBidder', id);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function getAmount(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getAmount', id);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}


async function getCreator(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getCreator', id);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function getManager(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getManager', id);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function getBeneficiary(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getBeneficiary', id);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function approveTender(id, manager) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('approveTender', id, manager);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function setClosingDate(id, manager, day, month, year) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('setClosingDate', id, manager, day, month, year);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function setOpeningDate(id, manager, day, month, year) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('setOpeningDate', id, manager, day, month, year);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function submitTenderTemplate(template) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('submitTenderTemplate',template);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        return '{"error": "' + error.message + '"}';
    } finally {
        await disconnectGateway();
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function disconnectGateway() {
    gateway.disconnect();
}

module.exports = {
    getAllTenders: getAllTenders, 
    getBidder: getBidder, 
    getAmount: getAmount,
    getCreator: getCreator, 
    getManager: getManager, 
    getBeneficiary: getBeneficiary, 
    approveTender: approveTender,
    setClosingDate: setClosingDate, 
    setOpeningDate: setOpeningDate, 
    submitTenderTemplate: submitTenderTemplate, 
}