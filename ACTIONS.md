
## SETUP ACTIONS
FUNCTION                        ACTION-NAME                                 ACTION-DESCRIPTION
1. [Role]
- get_all_role                  => ViewRoleList                             => View role's list
- get_role                      => ViewRoleDetails                          => View role details
- create_role                   => CreateRole                               => Create new role
- remove_role                   => RemoveRole                               => Remove role
- remove_multiple_role          => RemoveMultipleRole                       => Remove multiple roles
- update_role                   => UpdateRole                               => Update role
- trash                         => TrashRole                                => Move role to trash

2. [AccessRight]
- get_all_accessright           => ViewAccessRightList                      => View access right's list
- get_accessright               => ViewAccessRightDetails                   => View access right details
- create_accessright            => CreateAccessRight                        => Create new access rights
- remove_accessright            => RemoveAccessRight                        => Remove access right
- remove_multiple_accessright   => RemoveMultipleAccessRight                => Remove multiple access rights
- update_accessright            => UpdateAccessRight                        => Update access right
- trash                         => TrashAccessRight                         => Move access right to trash

3. [Client]
- get_all_client                => ViewClientList                           => View client's list
- get_client                    => ViewClientDetails                        => View client details
- create_client                 => CreateClient                             => Create new client
- remove_client                 => RemoveClient                             => Remove client
- remove_multiple_client        => RemoveMultipleClient                     => Remove multiple clients
- update_client                 => UpdateClient                             => Update client
- trash                         => TrashClient                              => Move client to trash
- [ClientLine] FK -> Client
- get_all_clientline            => ViewClientDetails    
- get_clientline_clientId       => ViewClientDetails    
- get_clientline                => ViewClientDetails    
- create_clientline             => CreateClient 
- remove_clientline             => RemoveClient
- remove_multiple_clientline    => RemoveClient
- update_clientline             => UpdateClient
- update_multiple_clientline    => UpdateClient

4. [Department]
- get_all_department            => ViewDepartmentList                       => View department's list
- get_department                => ViewDepartmentDetails                    => View department details
- create_department             => CreateDepartment                         => Create new department
- remove_department             => RemoveDepartment                         => Remove department
- remove_multiple_department    => RemoveMultipleDepartment                 => Remove multiple department's
- update_department             => UpdateDepartment                         => Update department
- trash                         => TrashDepartment                          => Move department to trash

5. [Permission]
- get_all_permission            => ViewPermissionList                       => View permission's list
- get_permission                => ViewPermissionDetail                     => View permission details
- create_permission             => CreatePermission                         => Create new permission
- remove_permission             => RemovePermission                         => Remove permission
- remove_multiple_permission    => RemoveMultiplePermission                 => Remove multiple permission's
- update_permission             => UpdatePermission                         => Update permission

6. [Product]
- get_all_product               => ViewProductList                          => View product's list
- get_product                   => ViewProductDetails                       => View product details
- create_product                => CreateProduct                            => Create new product
- remove_product                => RemoveProduct                            => Remove product
- remove_multiple_product       => RemoveMultipleProduct                    => Remove multiple product
- update_product                => UpdateProduct                            => Update product
- trash                         => TrashProduct                             => Move product to trash

7. [User]
- current_user                  => ViewProfile                              => View user profile // doesn't need permission
- get_all_user                  => ViewUserList                             => View user's list 
- get_user                      => ViewUserDetails                          => View user details
- create_user                   => CreateUser                               => Create new user
- remove_user                   => RemoveUser                               => Remove user
- update_user                   => UpdateUser                               => Update user
- change_pass_user              => ChangePassword                           => Change user's password // doesn't need permission
- trash                         => TrashUser                                => Move user to trash

## TRANSACTION ACTION

8. [Ticket]
- get_all_ticket                => ViewTicketList                           => View ticket list
- get_all_ticket_userId         => ViewAssignedTickets                      => View assigned tickets
- get_ticket                    => ViewTicketDetails                        => View ticket details
- create_ticket                 => CreateTicket                             => Create new ticket
- remove_ticket                 => RemoveTicket                             => Remove ticket
- remove_multiple_ticket        => RemoveMultipleTicket                     => Remove multiple ticket
- update_ticket                 => UpdateTicket                             => Update ticket
- trash                         => TrashTicket                              => Move ticket to trash
- [TicketLine] -> FK Ticket       // doesn't need permission
- get_all_ticketline_ticketId   =>
- get_all_ticketline            =>
- get_ticketline                =>
- create_ticketline             =>
- remove_ticketline             =>
- remove_multiple_ticketline    =>
- update_ticketline             =>
- update_multiple_ticketline    =>

9. [TicketReview]
- get_all_ticketreview          => ViewTicketReviewList                     => View reviewed tickets list
- get_ticketreview              => ViewTicketReviewDetails                  => View reviewed ticket details
- create_ticketreview           => ReviewTicket                             => Review a ticket
- remove_ticketreview           => RemoveTicketReview                       => Remove ticket review
- update_ticketreview           => UpdateTicketReview                       => Update reviewed ticket
- trash                         => TrashTicketReview                        => Move ticket to trash

10. [Attachment] // doesn't need permission
- get_all_attachment_ticketId   => 
- get_all_attachment            => 
- get_attachment                => 
- create_attachment             => 
- remove_attachment             => 
- remove_multiple_attachment    => 
- update_attachment             => 
- update_multiple_attachment    => 

11. [LicenseRequest]
- get_all_licenserequest        => ViewAllLicenseRequest                    => View all license request
- get_licenserequest            => ViewLicenseRequestDetails                => View license request details
- create_licenserequest         => CreateLicenseRequest                     => Create new license request
- remove_licenserequest         => RemoveLicenseRequest                     => Remove license request
- update_licenserequest         => UpdateLicenseRequest                     => Update license request
- trash                         => TrashLicenseRequest                      => Move license request to trash
## LOG HISTORY

12. [AuditTrail]
- get_all_audittrail            => ViewAuditTrailList
- get_auditrail                 => ViewAuditTrailDetails

## REPORTS

13. [Reports]
- ticket_summary_report             => TicketSummaryReport
- ticket_aging_report               => TicketAgingReport
- ticket_resolutiontime_report      => TicketResolutionTimeReport
- csat_report                       => CSATReport
- staff_performance_report          => StaffPerformanceReport
- team_workload_report              => TeamWorkloadReport
- ticket_category_analysis_report   => TicketCategoryAnalysisReport 

14. [Settings]
- truncate_transactions         => TruncateTransactions
