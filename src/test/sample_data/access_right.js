    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : TEST DATA SAMPE
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */

    import bcrypt from 'bcrypt';

    export async function accessright_data() {
        const rand = Math.floor(Math.random() * 9999999);
        const saltRounds = 10;
        const randhash = await bcrypt.hash(rand.toString(), saltRounds);
        let str = randhash.substring(0,40);
        return {
            "Name": `${str}`,
            "Description": "sample",
            "IsDeleted": 0,
            "DeletedBy": null,
            "CreatedBy": 1,
            "DateCreated": "2024-05-23T00:00:00.000Z",
            "UpdatedBy": null,
            "DateUpdated": null
        };
    }

