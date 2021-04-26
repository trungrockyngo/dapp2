const fabricConfig = require('./config');
let gateway; 

async function init() {
    let contract;
    
    try {
        const { Wallets } = require('fabric-network');
        const { Gateway } = require('fabric-network'); //Creates a new gateway and use it to connect to the network
        const path = require('path');
        const fs = require('fs');
    
        //const walletPath = path.join(process.cwd(), './wallet/Org1');
        const walletPath = path.join(process.cwd(), fabricConfig.walletFolder);

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        gateway = new Gateway();
        //const connectionProfilePath = path.resolve(__dirname, '../gateway', '1OrgLocalFabricOrg1GatewayConnection.json');

        const connectionProfilePath = path.resolve(__dirname, fabricConfig.connProfileFolder, fabricConfig.connProfile);

        const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));

        const connectionOptions = {
            wallet, identity: fabricConfig.walletFile, discovery:
                { enabled: true, asLocalhost: true }
        };

        await gateway.connect(connectionProfile, connectionOptions);        
        // Get the network (channel) our contract is deployed to.
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



module.exports = {
    getAllTenders: getAllTenders
}