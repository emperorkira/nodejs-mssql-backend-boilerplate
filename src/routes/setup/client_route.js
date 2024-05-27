    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */
   
    import express from 'express';
    import { get_all_client, get_client, create_client, update_client, remove_client, remove_multiple_client, trash_client, trash_multiple_client, get_all_clientline, create_multiple_clientline, update_multiple_clientline } from '../../controllers/index.js'
    import { verifyToken } from '../../middleware/index.js'

    const router = express.Router();

    // Client
    router.get("/", verifyToken, get_all_client);
    router.get("/details/:Id", verifyToken, get_client);
    router.post("/create", verifyToken, create_client);
    router.patch("/update/:Id", verifyToken, update_client);
    router.delete("/remove/:Id", verifyToken, remove_client);
    router.delete("/remove-multiple/", verifyToken, remove_multiple_client);
    router.patch("/trash/:Id", verifyToken, trash_client);
    router.patch("/trash-multiple", verifyToken, trash_multiple_client);

    // ClientLine
    router.get("/line/:Id", verifyToken, get_all_clientline); // Id refers to ClientId
    router.post("/line/create", verifyToken, create_multiple_clientline);
    router.patch("/line/update/", verifyToken, update_multiple_clientline);

    export default router;
