import {getUserByUsername, isDefaultRecord} from './functions';

export const FUNCTION_getUserByUsername = async () => {
    try {
        let count = 0;
        // TestCase #1: It should return the user's username
        const tc1 = await getUserByUsername('superuser');
        if (tc1.Username === 'superuser') {
            count++;
            console.log(`[✔] It should return the user's username => PASS`);
        }
        else console.log(`[x] It should return the user's username => ERROR`);

        // TestCase #2: It should return a null value if the users username is not found
        const tc2 = await getUserByUsername('superuser33');
        if (tc2.Username === undefined) {
            count++;
            console.log(`[✔] It should return a [ ] value if the users username is not found => PASS`);
        }
        else console.log(`[x] It should return a [ ] value if the users username is not found => ERROR`);

        // TestCase #3: It should return a null value if the users username is undefined
        const tc3 = await getUserByUsername(undefined);
        if (tc3.Username === undefined) {
            count++;
            console.log(`[✔] It should return a [ ] value if the users username is undefined=> PASS`);
        }
        else console.log(`[x] It should return a [ ] value if the users username is undefined => ERROR`);

        // result
        console.log('\nFUNCTION TEST: getUserByUsername');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: getUserByUsername Error : ${error}`);
    }
}

export const FUNCTION_isDefaultRecord = async () => {
    try {
        let count = 0;
        // TestCase #1: If inputted table that has no default record it should return false
        const tc1 = await isDefaultRecord(3, 'testingni');
        if (!tc1) {
            count++;
            console.log(`[✔] If inputted table that has no default record it should return false => PASS`);
        }
        else console.log(`[x] If inputted table that has no default record it should return false => ERROR`);
        

        // TestCase #2: It should return false, If table is undefined
        const tc2 = await isDefaultRecord(1, undefined);
        if (!tc2) {
            count++;
            console.log(`[✔] It should return false, If table is undefined => PASS`);
        }
        else console.log(`[x] It should return false, If table is undefined => ERROR`);
        
        // TestCase #3: It should return false, If table is correct but the Id is zero (0)
        const tc3 = await isDefaultRecord(0, 'User');
        if (!tc3) {
            count++;
            console.log(`[✔] It should return false, If table is correct but the Id is zero (0) => PASS`);
        }
        else console.log(`[x] It should return false, If table is correct but the Id is zero (0) => ERROR`);
        
        // TestCase #4: It should return true, the params are correct
        const tc4 = await isDefaultRecord(1, 'User');
        if (tc4) {
            count++;
            console.log(`[✔] It should return true, the params are correct => PASS`);
        }
        else console.log(`[x] It should return true, the params are correct => ERROR`);
        
        
        // result
        console.log('\nFUNCTION TEST: isDefaultRecord');
        console.log(`PASSED: [${count}/4]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: isDefaultRecord Error : ${error}`);
    }
}

(async()=>{
    await FUNCTION_isDefaultRecord();
})();