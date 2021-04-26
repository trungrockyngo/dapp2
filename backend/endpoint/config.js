//TO-DO: replace this simple config node script with .env maybe

const walletFolder = './wallet/Org1';
const walletFile = 'Org1 Admin';
const connProfileFolder = '../gateway';
const connProfile = '1OrgLocalGatewayConn.json';
const contractName = 'TenderBullet';
const channelName = 'mychannel';

module.exports = {
    walletFolder: walletFolder,
    walletFile: walletFile,
    connProfileFolder: connProfileFolder,
    connProfile: connProfile,
    contractName: contractName,
    channelName: channelName
};
