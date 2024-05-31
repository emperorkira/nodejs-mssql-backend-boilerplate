import { User } from './'
import { NVarChar, Int, DateTime } from 'mssql';

(async()=>{
    try {
        
        const Data:any = {
            Id:3,
            Username:"markieyans",
            Password:"55",
            Firstname:"Mark",
            Middlename:"",
            Lastname:"Yan",
            Gender:"Male",
            Birthdate:"1999-04-08",
            Address:"Basak San Nicolas",
            ContactNumber:"09532288400",
            Image:"",
            DepartmentId:1,
            RoleId:1,
            IsDeactivated:0,
            IsDeleted:0,
            CreatedBy:1
        };

        const create = {
            Username: 'testuser',
            Password: 'password123',
            Firstname: 'Test',
            Middlename: 'T',
            Lastname: 'User',
            Gender: 'M',
            Birthdate: new Date('1990-01-01'),
            Address: '123 Test St',
            ContactNumber: '1234567890',
            Image: 'image.png',
            IsDeactivated:0,
            DepartmentId: 1,
            RoleId: 1,
            IsDeleted: 0,
        };
        
        const user = new User(create, 1);
        let res: any;
        //if ( await user.validate()) res=await user.save();
        const validation = await user.validate();
        if (validation.result) res = await user.save();
        console.log(res);

    } catch (error:any) {
        console.log(error)
    }

})();