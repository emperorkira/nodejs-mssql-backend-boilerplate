
export const accessrights_fields = ['Code', 'Name', 'Description', 'CreatedBy', 'DateCreated', 'UpdatedBy', 'DateUpdated'];
export const attachment_fields = ['TicketId', 'TicketReviewId', 'Attachment'];
export const audittrail_fields = ['UserId', 'Action', 'Record', 'RecordTable', 'DateCreated'];
export const client_fields = ['Code', 'Name', 'Address', 'Email', 'ContactPerson', 'MobileNumber', 'LandlineNumber', 'DateSoftwareAcceptance', 'DateBCSRenewal', 'DateBCSExpiry', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const department_fields = [ 'Code', 'Name', 'Description', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated' ];
export const devicetoken_fields = ['UserId', 'Tokens', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const notification_fields = ['UserId', 'Description', 'LinkedComponent',  'Status', 'DateCreated', 'DateUpdated'];
export const permission_fields = [ 'Code', 'RoleId', 'AccessRightId', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const product_fields = [ 'Code',  'Name', 'Description', 'Category', 'Price', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const role_fields = [ 'Code', 'Name', 'Description', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const ticket_fields = [ 'TicketNumber', 'ClientId', 'Caller', 'Concern', 'ProductId', 'AnsweredBy', 'Status', 'Remarks', 'Category', 'Severity', 'AssignedBy', 'Solution', 'DoneDate', 'IsReviewed', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const ticketline_fields = [ 'TicketId', 'Action', 'DateCalled', 'DateFinished' ];
export const ticketreview_fields = [ 'TicketId', 'TicketReviewNumber', 'ReviewedBy', 'Comments', 'StatisfactoryRate', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const user_fields = [ 'Code', 'Username', 'Password', 'Firstname', 'Middlename', 'Lastname', 'Gender', 'Birthdate', 'Address', 'ContactNumber', 'Image', 'DepartmentId', 'RoleId', 'isDeactivated', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const update_user_fields = [ 'Username', 'Password', 'Firstname', 'Middlename', 'Lastname', 'Gender', 'Birthdate', 'Address', 'ContactNumber', 'Image', 'DepartmentId', 'RoleId', 'isDeactivated', 'UpdatedBy', 'DateUpdated'];