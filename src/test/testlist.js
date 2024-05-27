
import { accessright_details, accessright_list, accessright_create } from './functions/index.js'
import { accessright_data } from './sample_data/index.js';

export const testlist = async () => {

    let count = [], UserId = 1;
    const test1 = await accessright_list(UserId);
    const test2 = await accessright_details(1, UserId);
    const test3 = await accessright_create(UserId, accessright_data)
    console.log(`TestCase#1: ${test1.function} => ${(test1.message)} `); // access right list
    console.log(`TestCase#2: ${test2.function} => ${(test2.message)} `); // access right details
    console.log(`TestCase#3: ${test3.function} => ${(test3.message)} `); // access right details
}


