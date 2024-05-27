    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */
   
    import express from 'express';
    import { get_all_notification, get_notification, create_notification, update_notification, remove_notification, remove_multiple_notification } from '../../controllers/index.js'
    import { verifyToken } from '../../middleware/index.js'

    const router = express.Router();

    // Notification
    router.get("/:Id", verifyToken, get_all_notification);
    router.get("/details/:Id", verifyToken, get_notification);
    router.post("/create", verifyToken, create_notification);
    router.patch("/update/:Id", verifyToken, update_notification);
    router.delete("/remove/:Id", verifyToken, remove_notification);
    router.delete("/remove-multiple/", verifyToken, remove_multiple_notification);

    export default router;
