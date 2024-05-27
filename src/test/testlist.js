
    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : TEST CASES
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */
    import { accessright_details, accessright_list, accessright_create, accessright_update } from './functions/index.js'
    import { accessright_data } from './sample_data/index.js';


    export const testlist = async () => {
        

        let count = [], UserId = 1;
        const test1 = await accessright_list(UserId);
        console.log(`TestCase#1: ${test1.function} => ${(test1.message)} `); // access right list

        const test2 = await accessright_details(1, UserId);
        console.log(`TestCase#2: ${test2.function} => ${(test2.message)} `); // access right details

        const test3 = await accessright_create(UserId, await accessright_data())
        console.log(`TestCase#3: ${test3.function} => ${(test3.message)} `); // access right create

        const test4 = await accessright_update(1002, await accessright_data(), UserId)
        console.log(`TestCase#4: ${test4.function} => ${(test4.message)} `); // access right update


    }


