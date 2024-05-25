
// SETUP FIELDS
export const accessrights_fields = ['Code', 'Name', 'Description', 'IsDeleted', 'CreatedBy', 'DateCreated', 'UpdatedBy', 'DateUpdated'];
export const user_fields = [ 'Code', 'Username', 'Password', 'Firstname', 'Middlename', 'Lastname', 'Gender', 'Birthdate', 'Address', 'ContactNumber', 'Image', 'DepartmentId', 'RoleId', 'isDeactivated', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const client_fields = ['Code', 'Name', 'Address', 'Email', 'ContactPerson', 'MobileNumber', 'LandlineNumber', 'DateSoftwareAcceptance', 'DateBCSRenewal', 'DateBCSExpiry', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const department_fields = [ 'Code', 'Name', 'Description', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated' ];
export const permission_fields = [ 'Code', 'RoleId', 'AccessRightId', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const product_fields = [ 'Code',  'Name', 'Description', 'Category', 'Price', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const role_fields = [ 'Code', 'Name', 'Description', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];

// TRANSACTIONS
export const ticket_fields = [ 'TicketNumber', 'ClientId', 'Caller', 'Concern', 'ProductId', 'AnsweredBy', 'Status', 'Remarks', 'Category', 'Severity', 'AssignedBy', 'Solution', 'DoneDate', 'IsReviewed', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const ticketline_fields = [ 'TicketId', 'Action', 'DateCalled', 'DateFinished' ];
export const ticketreview_fields = [ 'TicketId', 'TicketReviewNumber', 'ReviewedBy', 'Comments', 'StatisfactoryRate', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const attachment_fields = ['TicketId', 'TicketReviewId', 'Attachment'];
export const licenserequest_fields = [ 'RequestNumber', 'Title', 'Description', 'ClientId', 'ProductId', 'IsApprove', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];

// LOGS
export const audittrail_fields = ['UserId', 'Action', 'Record', 'RecordTable', 'DateCreated'];
export const notification_fields = ['UserId', 'Description', 'LinkedComponent',  'Status', 'DateCreated', 'DateUpdated'];
export const devicetoken_fields = ['UserId', 'Tokens', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
