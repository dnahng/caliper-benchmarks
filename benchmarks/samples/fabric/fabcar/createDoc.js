/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const type = ['txt', 'docx', 'pdf', 'exe', 'ppt', 'xlxs', 'jpeg', 'png', 'mov', 'mp4'];
const file = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
const owners = ['Tomoko', 'Yuta Nakamato', 'Jisoo Park', 'Johnny Suh', 'Ariana Grande', 'Momo Hirai', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];
const tagsList = ['2.txt|demo|@ 11/2/2022 16:24:12 V1.00', '2.txt|demo|@ 11/3/2022 9:23:45 V1.00,2.txt|demo|@ 11/3/2022 9:26:25 V1.00,2.txt|demo|@ 11/3/2022 9:52:21 V1.00']
const time = ['Draft @ 11/2/2022 16:24:12,Draft @ 11/3/2022 9:23:45,Draft @ 11/3/2022 9:26:25', 'Draft @ 11/5/2022 12:47:31']


/**
 * Workload module for the benchmark round.
 */
class CreateCarWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;
        let id = 'Member' + this.workerIndex + '_DOC' + this.txIndex.toString();
        let fileName = file[Math.floor(Math.random() * file.length)];
        let fileType = type[Math.floor(Math.random() * type.length)];
        let fileSize = Math.floor(Math.random());
        let fileTagsList = tagsList[Math.floor(Math.random() * tagsList.length)];
        let fileVersion = `v${Math.floor(Math.random())}`;
        let stateTimestampList = time[Math.floor(Math.random() * time.length)];
        let fileCreator = owners[Math.floor(Math.random() * owners.length)];
        let fileMinApprovers = Math.floor(Math.random());


        let args = {
            contractId: 'assetcc',
            contractVersion: 'v4.6',
            contractFunction: 'createDoc',
            contractArguments: [id, fileName, fileType, fileSize, fileTagsList, fileVersion, stateTimestampList, fileCreator, fileMinApprovers],
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateCarWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
