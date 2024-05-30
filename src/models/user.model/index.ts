
/*
import Add from '../add.model'
import { ERROR, TABLE } from '../../shared';
import { Int, NVarChar, DateTime } from 'mssql'
import Finder from '../../functions/finder.helper';

export class User {
    private Id: number;
    private Code: string;       private Username: string;
    private Password: string;   private Firstname: string;
    private Middlename: string; private Lastname: string;
    private Gender: string;     private Birthdate: Date;
    private Address: string;    private ContactNumber: string;
    private Image: string;      private DepartmentId: number;
    private RoleId: number;     private IsDeactivated: number;
    private IsDeleted: number;  private DeletedBy: number;
    private CreatedBy: number;  private DateCreated: Date;
    private UpdatedBy: number;  private DateUpdate: Date;

    constructor( UserData: any, Action: string ){
        this.Id = UserData.Id || null;
        this.Code = UserData.Code;
        this.Username = UserData.Username;
        this.Password = UserData.Password;
        this.Firstname = UserData.Firstname;
        this.Middlename = UserData.Middlename || null;
        this.Lastname = UserData.Lastname;
        this.Birthdate = UserData.Birthdate;
        this.Gender = UserData.Gender;
        this.Address = UserData.Address;
        this.Image = UserData.Image || null;
        this.ContactNumber = UserData.ContactNumber;
        this.DepartmentId = UserData.DepartmentId;
        this.RoleId = UserData.RoleId;
        this.IsDeactivated = UserData.IsDeactivated;
        this.DeletedBy = UserData.DeletedBy || null
        this.IsDeleted = UserData.IsDeleted || 0;
        this.CreatedBy = UserData.CreatedBy;
        this.DateCreated = UserData.DateCreated;
        this.UpdatedBy = UserData.UpdatedBy || null;
        this.DateUpdate = UserData.DateUpdate || null;
    }

    save = async ( Action:any ): Promise<any> =>{
        try {
            if (!Action) return { message: 'Action is missing', saved: false };
            if (Action !== 'update' || Action !== 'new') return { message: 'Action refers to create or update', saved: false };
            const Field: Array<string> = [
                'Code',         'Username',     'Password',     'Firstname',    'Middlename',   'Lastname', 
                'Gender',       'Birthdate',    'Address',      'ContactNumber','Image',        'DepartmentId', 
                'RoleId',       'isDeactivated','IsDeleted',    'DeletedBy',    'CreatedBy',    'DateCreated',  
                'UpdatedBy',    'DateUpdated'
            ];
            const Type: Array<any> = [
                NVarChar(50),   NVarChar(255),  NVarChar(255),  NVarChar(50),   NVarChar(50),   NVarChar(50),
                NVarChar(50),   DateTime,       NVarChar(255),  NVarChar(50),   NVarChar(255),  Int,
                Int,            Int,            Int,            Int,            Int,            DateTime,
                Int,            DateTime
            ];
            const Value: Array<any> = [

            ]
            if (Action === 'create'){
                if (await Finder.isFound(TABLE.t014, ['Username'], [NVarChar(50)], [this.Username])) return { message: ERROR.e00x06, saved: false };
                const Create: boolean = await Add.record(TABLE.t014, Field, Type, Value)

            }
            //const updated_user_fields = user_fields.filter(field => !fieldsToRemove.includes(field));
            return true;
        } catch ( error:any) {
            return { message: error.array(), saved: false };
        }
    }
    remove(){

    }

};


// new User(req.body).save('new');
// res = await User(req.body).save('new).message*/