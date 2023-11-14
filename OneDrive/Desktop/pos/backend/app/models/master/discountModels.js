//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

//DEFINE THE MODEL
class Discount {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.Discount=data.Discount;
    this.DiscountRate=data.DiscountRate;
    this.IsVatExempt=data.IsVatExempt;
    this.IsDateScheduled=data.IsDateScheduled;
    this.GeneDateStartricName=data.DateStart;
    this.DateEnd=data.DateEnd;
    this.IsTimeScheduled=data.IsTimeScheduled;
    this.TimeStart=data.TimeStart;
    this.TimeEnd=data.TimeEnd;
    this.IsDayScheduled=data.IsDayScheduled;
    this.DayMon=data.DayMon;
    this.DayTue=data.DayTue;
    this.DayWed=data.DayWed;
    this.DayThu=data.DayThu;
    this.DayFri=data.DayFri;
    this.DaySat=data.DaySat;
    this.DaySun=data.DaySun;
    this.EntryUserId=data.EntryUserId;
    this.EntryDateTime=data.EntryDateTime;
    this.UpdateUserId=data.UpdateUserId;
    this.UpdateDateTime=data.UpdateDateTime;
    this.IsLocked=data.IsLocked;
  }
  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 21, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : create(data)
  ****************************************************************/
  static async add(DiscountCode,data) {
    DiscountCode=String(DiscountCode);
    let pool;
    try {
      pool = await db.initializePool();       //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        INSERT INTO [MstDiscount](
          Discount, DiscountRate, IsVatExempt, IsDateScheduled, DateStart,
          DateEnd, IsTimeScheduled, TimeStart, TimeEnd, IsDayScheduled, 
          DayMon, DayTue, DayWed, DayThu, DayFri, DaySat, DaySun,
          EntryUserId, EntryDateTime, UpdateUserId, UpdateDateTime, IsLocked, DiscountCode
        )
        VALUES (
          @Discount, @DiscountRate, @IsVatExempt, @IsDateScheduled, @DateStart,
          @DateEnd, @IsTimeScheduled, @TimeStart, @TimeEnd, @IsDayScheduled, 
          @DayMon, @DayTue, @DayWed, @DayThu, @DayFri, @DaySat, @DaySun,
          @EntryUserId, @EntryDateTime, @UpdateUserId, @UpdateDateTime, @IsLocked, @DiscountCode
        )
      `;
      request
        .input('Discount', sql.NVarChar(50), data.Discount)
        .input('DiscountCode', sql.NVarChar(255), DiscountCode)
        .input('DiscountRate', sql.Decimal(18,5), data.DiscountRate  || 0)
        .input('IsVatExempt', sql.Bit, data.IsVatExempt )
        .input('IsDateScheduled', sql.Bit, data.IsDateScheduled )
        .input('DateStart', sql.DateTime, data.DateStart || null)
        .input('DateEnd', sql.DateTime, data.DateEnd || null)
        .input('IsTimeScheduled', sql.Bit, data.IsTimeScheduled)
        .input('TimeStart', sql.DateTime, data.TimeStart || null)
        .input('TimeEnd', sql.DateTime, data.TimeEnd || null)
        .input('IsDayScheduled', sql.Bit, data.IsDayScheduled )
        .input('DayMon', sql.Bit, data.DayMon  )
        .input('DayTue', sql.Bit, data.DayTue  )
        .input('DayWed', sql.Bit, data.DayWed  )
        .input('DayThu', sql.Bit, data.DayThu  )
        .input('DayFri', sql.Bit, data.DayFri  )
        .input('DaySat', sql.Bit, data.DaySat  )
        .input('DaySun', sql.Bit, data.DaySun  )
        .input('EntryUserId', sql.Int, data.EntryUserId)
        .input('EntryDateTime', sql.DateTime, data.EntryDateTime || 0)
        .input('UpdateUserId', sql.Int, data.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime || 0)
        .input('IsLocked', sql.Bit, data.IsLocked || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : TO BE TESTED
    DATE CREATED/UPDATED : September 21, 2023
    PURPOSE              : STATIC FUNCTION FOR UPDATE or EDIT DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(id, data)
  ****************************************************************/
  static async update(Id, data) {
    let pool;
    try {
      pool = await db.initializePool();       //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE [MstDiscount] SET
        Discount = @Discount, 
        DiscountRate = @DiscountRate, 
        IsVatExempt = @IsVatExempt, 
        IsDateScheduled = @IsDateScheduled, 
        DateStart = @DateStart,
        DateEnd = @DateEnd, 
        IsTimeScheduled = @IsTimeScheduled, 
        TimeStart = @TimeStart, 
        TimeEnd = @TimeEnd, 
        IsDayScheduled = @IsDayScheduled, 
        DayMon = @DayMon, 
        DayTue = @DayTue, 
        DayWed = @DayWed, 
        DayThu = @DayThu, 
        DayFri = @DayFri, 
        DaySat = @DaySat, 
        DaySun = @DaySun,
        UpdateUserId = @UpdateUserId,
        UpdateDateTime = @UpdateDateTime
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id) // Assuming there's an 'Id' field to specify the record to update
        .input('Discount', sql.NVarChar(50), data.Discount)
        .input('DiscountRate', sql.Decimal(18,5), data.DiscountRate  || 0)
        .input('IsVatExempt', sql.Bit, data.IsVatExempt )
        .input('IsDateScheduled', sql.Bit, data.IsDateScheduled )
        .input('DateStart', sql.DateTime, data.DateStart || null)
        .input('DateEnd', sql.DateTime, data.DateEnd || null)
        .input('IsTimeScheduled', sql.Bit, data.IsTimeScheduled)
        .input('TimeStart', sql.DateTime, data.TimeStart || null)
        .input('TimeEnd', sql.DateTime, data.TimeEnd || null)
        .input('IsDayScheduled', sql.Bit, data.IsDayScheduled )
        .input('DayMon', sql.Bit, data.DayMon  )
        .input('DayTue', sql.Bit, data.DayTue  )
        .input('DayWed', sql.Bit, data.DayWed  )
        .input('DayThu', sql.Bit, data.DayThu  )
        .input('DayFri', sql.Bit, data.DayFri  )
        .input('DaySat', sql.Bit, data.DaySat  )
        .input('DaySun', sql.Bit, data.DaySun  )
        .input('UpdateUserId', sql.Int, data.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : October 20, 2023
    PURPOSE              : Update user table, insert UserCode and filled it
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : fillUserCode(Id, data)
  ****************************************************************/
    static async fillDiscountCode(Id, DiscountCode) {
      let pool;
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const request = pool.request(); // SET DATABASE REQUEST
        const query = `
          UPDATE [MstDiscount] SET
            DiscountCode = @DiscountCode
          WHERE Id = @Id
        `;
        request
          .input('Id', sql.Int, Id)
          .input('DiscountCode', sql.NVarChar(255), DiscountCode);
        const result = await request.query(query);
        if (result.rowsAffected[0] > 0) return true;
        else return false;
      } catch (error) {
        throw error;
      } finally {
        if (pool) pool.close();
      }
    }//END FUNCTION HERE
    
}//END CLASS

//EXPORT CLASS
module.exports = {
  Discount: Discount,
};
