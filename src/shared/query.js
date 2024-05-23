export const QUERY = {
    "q00x001":"SELECT TOP 1 FROM [dbo].[AccessRight] WHERE Name=@Name",
    "q00x002":"",
    "q00x003":"",
    "q00x004":"",
    "q00x005":"",
    "q00x006":"",
    "q00x007":"",
    "q00x008":"",
    "q00x009":"",
    "q00x010":"",
    "q010x001":"SELECT [AccessRightId] FROM [dbo].[Permission] WHERE RoleId = @RoleId",
    "q014x001":"SELECT * FROM [dbo].[AuditTrail] WHERE UserId = @UserId",
    "q014x002":"SELECT * FROM [dbo].[User] WHERE Username = @Username",
    "q014x003":"SELECT [Username] FROM [dbo].[User] WHERE Username = @Username AND Id <> @Id",
    "":""
}