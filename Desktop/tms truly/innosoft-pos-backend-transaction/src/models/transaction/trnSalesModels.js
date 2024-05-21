const db = require("../../thisbase/db");
const sql = require('mssql');

// DEFINE THE MODEL
class Sales {
  constructor(data) { //SET THE SCHEMA
    this.Id= data.Id;
    this.PeriodId=PeriodId;
    this.SalesDate=SalesDate;
    this.SalesNumber=SalesNumber;
    this.ManualInvoiceNumber=ManualInvoiceNumber || null; //Not Required
    this.Amount=Amount;
    this.TableId=TableId || 0;   //Not Required
    this.CustomerId=CustomerId;
    this.AccountId=AccountId;
    this.TermId=TermId;
    this.DiscountId=DiscountId || 0; //Not Required
    this.SeniorCitizenId=SeniorCitizenId || 0; //Not Required
    this.SeniorCitizenName=SeniorCitizenName || null; //Not Required
    this.SeniorCitizenAge=SeniorCitizenAge|| 0;//Not Required
    this.Remarks=Remarks; //Not Required
    this.SalesAgent=SalesAgent;
    this.TerminalId=TerminalId;
    this.PreparedBy=PreparedBy;
    this.CheckedBy=CheckedBy;
    this.ApprovedBy=ApprovedBy;
    this.IsLocked=IsLocked;
    this.IsCancelled=IsCancelled;
    this.PaidAmount=PaidAmount;
    this.CreditAmount=CreditAmount;
    this.DebitAmount=DebitAmount;
    this.BalanceAmount=BalanceAmount;
    this.EntryUserId=EntryUserId;
    this.EntryDateTime=EntryDateTime;
    this.UpdateUserId=UpdateUserId; //Default EntryUserId 
    this.UpdateDateTime=UpdateDateTime; //Default EntryDateTime
    this.Pax=Pax || 0; //Not Required
    this.TableStatus=TableStatus;
    
  }
    async add() {
      let pool;
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const query = `
            INSERT INTO [TrnSales](
                PeriodId, SalesDate, SalesNumber, ManualInvoiceNumber, Amount,
                TableId, CustomerId, AccountId, TermId, DiscountId, SeniorCitizenId,
                SeniorCitizenName, SeniorCitizenAge, Remarks, SalesAgent, TerminalId,
                PreparedBy, CheckedBy, ApprovedBy, IsLocked, IsCancelled, PaidAmount,
                CreditAmount, DebitAmount, BalanceAmount,
                EntryUserId, EntryDateTime, UpdateUserId, UpdateDateTime, Pax, TableStatus
            )
            VALUES (
                @PeriodId, @SalesDate, @SalesNumber, @ManualInvoiceNumber, @Amount,
                @TableId, @CustomerId, @AccountId, @TermId, @DiscountId, @SeniorCitizenId,
                @SeniorCitizenName, @SeniorCitizenAge, @Remarks, @SalesAgent, @TerminalId,
                @PreparedBy, @CheckedBy, @ApprovedBy, @IsLocked, @IsCancelled, @PaidAmount,
                @CreditAmount, @DebitAmount, @BalanceAmount,
                @EntryUserId, @EntryDateTime, @UpdateUserId, @UpdateDateTime, @Pax, @TableStatus
            )`;
          request
            .input('PeriodId', sql.Int, this.PeriodId)
            .input('SalesDate', sql.DateTime, this.SalesDate)
            .input('SalesNumber', sql.NVarChar(50), this.SalesNumber)
            .input('ManualInvoiceNumber', sql.NVarChar(50), this.ManualInvoiceNumber || null)
            .input('Amount', sql.Decimal(18,5), this.Amount)
            .input('TableId', sql.Int, this.TableId || 0)
            .input('CustomerId', sql.Int, this.CustomerId)
            .input('AccountId', sql.Int, this.AccountId)
            .input('TermId', sql.Int, this.TermId)
            .input('DiscountId', sql.Int, this.DiscountId || 0)
            .input('SeniorCitizenId', sql.NVarChar(50), this.SeniorCitizenId || 0)
            .input('SeniorCitizenName', sql.NVarChar(255), this.SeniorCitizenName || null)
            .input('SeniorCitizenAge', sql.Int, this.SeniorCitizenAge || 0)
            .input('Remarks', sql.NVarChar(MAX), this.Remarks || null)
            .input('SalesAgent', sql.Int, this.SalesAgent)
            .input('TerminalId', sql.Int, this.TerminalId)
            .input('PreparedBy', sql.Int, this.PreparedBy)
            .input('CheckedBy', sql.Int, this.CheckedBy)
            .input('ApprovedBy', sql.Int, this.ApprovedBy)
            .input('IsLocked', sql.Bit, this.IsLocked)
            .input('IsCancelled', sql.Bit, this.IsCancelled)
            .input('PaidAmount', sql.Decimal(18,5), this.PaidAmount)
            .input('CreditAmount', sql.Decimal(18,5), this.CreditAmount)
            .input('DebitAmount', sql.Decimal(18,5), this.DebitAmount)
            .input('BalanceAmount', sql.Decimal(18,5), this.BalanceAmount)
            .input('EntryUserId', sql.Int, this.EntryUserId)
            .input('EntryDateTime', sql.Int, this.EntryDateTime)
            .input('UpdateUserId', sql.Int, this.UpdateUserId)
            .input('UpdateDateTime', sql.Int, this.UpdateDateTime)
            .input('Pax', sql.Int, this.Pax || 0)
            .input('TableStatus', sql.Int, this.TableStatus);
            await request.query(query);
        return true;
      } catch (error) {
        throw error;
      } finally {
        if (pool) {
          pool.close();
        }
      }
    }//FUNCTION
  
}//CLASS

module.exports =  Sales;
