    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */

    import express from 'express';
    import { get_all_permission, get_permission, create_permission, update_permission, remove_multiple_permission } from '../../controllers/index.js'
    import { verifyToken } from '../../middleware/index.js'

    const router = express.Router();

    // Permission
    router.get("/:Id", verifyToken, get_all_permission);
    router.get("/details/:Id", verifyToken, get_permission);
    router.post("/create", verifyToken, create_permission);
    router.delete("/remove", verifyToken, remove_multiple_permission);

    export default router;
