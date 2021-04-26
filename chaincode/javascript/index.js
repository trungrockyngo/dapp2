/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const TenderingPrivateDataCollection = require('./lib/tendering-PDC');
const TenderingContract = require('./lib/tendering');

module.exports.TenderingPrivateDataCollection = TenderingPrivateDataCollection;
module.exports.TenderingContract = TenderingContract;
module.exports.contracts = [ TenderingPrivateDataCollection, TenderingContract ];
