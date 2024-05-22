/*
import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'

    export const getUserByUsername = async (Username = '') => {
        try{
            if (!Username) return null;
            const user = GET.record_by_fields('SELECT * FROM [dbo].[User] WHERE Username = @Username',['Username'],[sql.NVarChar(255)],[Username]);
            if (!user) console.log('No user found');
            return user || null;
        }catch(error){
            console.log('Error Functions auth_function.getUserByUsername');
            return null;
        }
    }*/