//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// Define the Item model
class Item {
  //SET ITEM SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.ItemCode=data.ItemCode;
    this.BarCode=data.BarCode;
    this.ItemDescription=data.ItemDescription;
    this.Alias=data.Alias;
    this.GenericName=data.GenericName;
    this.Category=data.Category;
    this.SalesAccountId=data.SalesAccountId
    this.AssetAccountId=data.AssetAccountId;
    this.CostAccountId=data.CostAccountId;
    this.InTaxId=data.InTaxId;
    this.OutTaxId=data.OutTaxId;
    this.UnitId=data.UnitId;
    this.DefaultSupplierId=data.DefaultSupplierId;
    this.Cost=data.Cost;
    this.MarkUp=data.MarkUp;
    this.Price=data.rice;
    this.ImagePath=data.ImagePath;
    this.ReorderQuantity=data.ReorderQuantity;
    this.OnhandQuantity=data.OnhandQuantity;
    this.IsInventory=data.IsInventory;
    this.ExpiryDate=data.ExpiryDate;
    this.LotNumber=data.LotNumber;
    this.Remarks=data.Remarks;
    this.EntryUserId=data.EntryUserId;
    this.EntryDateTime=data.EntryDateTime;
    this.UpdateUserId=data.UpdateUserId;
    this.UpdateDateTime=data.UpdateDateTime;
    this.IsLocked=data.IsLocked;
    this.DefaultKitchenReport=data.DefaultKitchenReport;
    this.IsPackage=data.IsPackage;
  }

  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 20, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA IN ITEM
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : create(data)
  ****************************************************************/
  static async add(ItemCode, item) {
    ItemCode=String(ItemCode);
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST

      const query = `
        INSERT INTO [MstItem](
          ItemCode, BarCode, ItemDescription, Alias, GenericName, Category,
          SalesAccountId, AssetAccountId, CostAccountId, InTaxId, OutTaxId, UnitId,
          DefaultSupplierId, Cost, MarkUp, Price, ImagePath, ReorderQuantity, OnhandQuantity,
          IsInventory, ExpiryDate, LotNumber, Remarks, EntryUserId, EntryDateTime,
          UpdateUserId, UpdateDateTime, IsLocked, DefaultKitchenReport, IsPackage
        )
        VALUES (
          @ItemCode, @BarCode, @ItemDescription, @Alias, @GenericName, @Category,
          @SalesAccountId, @AssetAccountId, @CostAccountId, @InTaxId, @OutTaxId, @UnitId,
          @DefaultSupplierId, @Cost, @MarkUp, @Price, @ImagePath, @ReorderQuantity, @OnhandQuantity,
          @IsInventory, @ExpiryDate, @LotNumber, @Remarks, @EntryUserId, @EntryDateTime,
          @UpdateUserId, @UpdateDateTime, @IsLocked, @DefaultKitchenReport, @IsPackage
        )
      `;

      request
        .input('ItemCode', sql.NVarChar(255), ItemCode)
        .input('BarCode', sql.NVarChar(255), item.BarCode)
        .input('ItemDescription', sql.NVarChar(255), item.ItemDescription)
        .input('Alias', sql.NVarChar(255), item.Alias)
        .input('GenericName', sql.NVarChar(255), item.GenericName)
        .input('Category', sql.NVarChar(255), item.Category)
        .input('SalesAccountId', sql.Int, item.SalesAccountId)
        .input('AssetAccountId', sql.Int, item.AssetAccountId)
        .input('CostAccountId', sql.Int, item.CostAccountId)
        .input('InTaxId', sql.Int, item.InTaxId)
        .input('OutTaxId', sql.Int, item.OutTaxId)
        .input('UnitId', sql.Int, item.UnitId)
        .input('DefaultSupplierId', sql.Int, item.DefaultSupplierId)
        .input('Cost', sql.Decimal(18, 5), item.Cost || 0)
        .input('MarkUp', sql.Decimal(18, 5), item.MarkUp || 0)
        .input('Price', sql.Decimal(18, 5), item.Price || 0)
        .input('ImagePath', sql.NVarChar(255), item.ImagePath)
        .input('ReorderQuantity', sql.Decimal(18, 5), item.ReorderQuantity || 0)
        .input('OnhandQuantity', sql.Decimal(18, 5), item.OnhandQuantity || 0)
        .input('IsInventory', sql.Bit, item.IsInventory || 0)
        .input('ExpiryDate', sql.DateTime, item.ExpiryDate || null)
        .input('LotNumber', sql.NVarChar(255), item.LotNumber || null)
        .input('Remarks', sql.NVarChar(255), item.Remarks || null)
        .input('EntryUserId', sql.Int, item.EntryUserId)
        .input('EntryDateTime', sql.DateTime, item.EntryDateTime)
        .input('UpdateUserId', sql.Int, item.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, item.UpdateDateTime)
        .input('IsLocked', sql.Bit, item.IsLocked || 0)
        .input('DefaultKitchenReport', sql.NVarChar(50), item.DefaultKitchenReport || null)
        .input('IsPackage', sql.Int, item.IsPackage || 0);

      const result = await request.query(query);

      if (result.rowsAffected[0] > 0) return true; // Rows were affected, indicating successful insertion
      else  return false; // No rows were affected, indicating insertion failed
      
    } catch (error) { throw error;}
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 20, 2023
    PURPOSE              : STATIC FUNCTION FOR UPDATE or EDIT DATA IN ITEM
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(Id, item)
  ****************************************************************/
  static async update(Id, item) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST

      const query = `
        UPDATE [MstItem]
        SET
            BarCode = @BarCode,
            ItemDescription = @ItemDescription,
            Alias = @Alias,
            GenericName = @GenericName,
            Category = @Category,
            SalesAccountId = @SalesAccountId,
            AssetAccountId = @AssetAccountId,
            CostAccountId = @CostAccountId,
            InTaxId = @InTaxId,
            OutTaxId = @OutTaxId,
            UnitId = @UnitId,
            DefaultSupplierId = @DefaultSupplierId,
            Cost = @Cost,
            MarkUp = @MarkUp,
            Price = @Price,
            ImagePath = @ImagePath,
            ReorderQuantity = @ReorderQuantity,
            OnhandQuantity = @OnhandQuantity,
            IsInventory = @IsInventory,
            ExpiryDate = @ExpiryDate,
            LotNumber = @LotNumber,
            Remarks = @Remarks,
            UpdateUserId = @UpdateUserId,
            UpdateDateTime = @UpdateDateTime,
            IsLocked = @IsLocked,
            DefaultKitchenReport = @DefaultKitchenReport,
            IsPackage = @IsPackage
        WHERE Id = @Id;
      `;
      request
        .input('Id', sql.Int, Id) // Assuming there's an 'Id' field to specify the record to update
        .input('BarCode', sql.NVarChar(255), item.BarCode)
        .input('ItemDescription', sql.NVarChar(255), item.ItemDescription)
        .input('Alias', sql.NVarChar(255), item.Alias)
        .input('GenericName', sql.NVarChar(255), item.GenericName)
        .input('Category', sql.NVarChar(255), item.Category)
        .input('SalesAccountId', sql.Int, item.SalesAccountId)
        .input('AssetAccountId', sql.Int, item.AssetAccountId)
        .input('CostAccountId', sql.Int, item.CostAccountId)
        .input('InTaxId', sql.Int, item.InTaxId)
        .input('OutTaxId', sql.Int, item.OutTaxId)
        .input('UnitId', sql.Int, item.UnitId)
        .input('DefaultSupplierId', sql.Int, item.DefaultSupplierId)
        .input('Cost', sql.Decimal(18, 5), item.Cost || 0)
        .input('MarkUp', sql.Decimal(18, 5), item.MarkUp || 0)
        .input('Price', sql.Decimal(18, 5), item.Price || 0)
        .input('ImagePath', sql.NVarChar(255), item.ImagePath)
        .input('ReorderQuantity', sql.Decimal(18, 5), item.ReorderQuantity || 0)
        .input('OnhandQuantity', sql.Decimal(18, 5), item.OnhandQuantity || 0)
        .input('IsInventory', sql.Bit, item.IsInventory || 0)
        .input('ExpiryDate', sql.DateTime, item.ExpiryDate || null)
        .input('LotNumber', sql.NVarChar(255), item.LotNumber || null)
        .input('Remarks', sql.NVarChar(255), item.Remarks || null)
        .input('UpdateUserId', sql.Int, item.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, item.UpdateDateTime)
        .input('IsLocked', sql.Bit, item.IsLocked || 0)
        .input('DefaultKitchenReport', sql.NVarChar(50), item.DefaultKitchenReport || null)
        .input('IsPackage', sql.Int, item.IsPackage || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true; // Rows were affected, indicating successful insertion
      else  return false; // No rows were affected, indicating insertion failed

    } catch (error) { throw error;}
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 20, 2023
    PURPOSE              : STATIC FUNCTION FOR FIND or SEARCH ONE ITEM 
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : find(Id, item)
  ****************************************************************/
  static async get(Id) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `SELECT 
                      [MstItem].*,
                      [SalesAccount].[Code] AS [SalesCode],
                      [SalesAccount].[Account] AS [SalesAccount],
                      [AssetAccount].[Code] AS [AssetCode],
                      [AssetAccount].[Account] AS [AssetAccount],
                      [CostAccount].[Code] AS [CostCode],
                      [CostAccount].[Account] AS [CostAccount],
                      [InTax].[Tax] AS [InTax],
                      [OutTax].[Tax] AS [OutTax],
                      [Unit].[Unit] AS [Unit],
                      [Supplier].[Supplier] AS [Supplier],
                      [EntryUser].[FullName] AS [EntryName],
                      [UpdateUser].[FullName] AS [UpdateName]
                    FROM [MstItem] 
                    INNER JOIN [MstAccount] AS SalesAccount ON SalesAccount.[Id] = [MstItem].[SalesAccountId]
                    INNER JOIN [MstAccount] AS AssetAccount ON AssetAccount.[Id] = [MstItem].[AssetAccountId]
                    INNER JOIN [MstAccount] AS CostAccount ON CostAccount.[Id] = [MstItem].[CostAccountId]
                    INNER JOIN [MstSupplier] AS Supplier ON Supplier.[Id] = [MstItem].[DefaultSupplierId]
                    INNER JOIN [MstTax] AS InTax ON InTax.[Id] = [MstItem].[InTaxId]
                    INNER JOIN [MstTax] AS OutTax ON OutTax.[Id] = [MstItem].[OutTaxId]
                    INNER JOIN [MstUnit] AS Unit ON Unit.[Id] = [MstItem].[UnitId]
                    INNER JOIN [MstUser] AS EntryUser ON EntryUser.[Id] = [MstItem].[EntryUserId]
                    INNER JOIN [MstUser] AS UpdateUser ON UpdateUser.[Id] = [MstItem].[UpdateUserId]
                    WHERE MstItem.Id = @Id`;
      request.input('Id', sql.Int, Id);
      const result = await request.query(query);

      if (result.recordset.length > 0) return result.recordset[0]; // Return the first item found (assuming Id is unique)
      else  return [];// Handle the case where no item was found with the given Id
    } 
    catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : October 23, 2023
    PURPOSE              : Update user table, insert ItemCode and filled it
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : fillUserCode(Id, data)
  ****************************************************************/
    static async fillDiscountCode(Id, ItemCode) {
      let pool;
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const request = pool.request(); // SET DATABASE REQUEST
        const query = `
          UPDATE [MstItem] SET
            ItemCode = @ItemCode
          WHERE Id = @Id
        `;
        request
          .input('Id', sql.Int, Id)
          .input('ItemCode', sql.NVarChar(255), ItemCode);
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

//EXPORT THE CLASS
module.exports = {
  Item: Item,
};
