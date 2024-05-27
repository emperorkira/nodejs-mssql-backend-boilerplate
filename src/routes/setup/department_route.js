    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */
   
    import express from 'express';
    import { get_all_department, get_department, create_department, update_department, remove_department, remove_multiple_department, trash_department, trash_multiple_department } from '../../controllers/index.js'
    import { verifyToken } from '../../middleware/index.js'

    const router = express.Router();

    // Client
    router.get("/", verifyToken, get_all_department);
    router.get("/details/:Id", verifyToken, get_department);
    router.post("/create", verifyToken, create_department);
    router.patch("/update/:Id", verifyToken, update_department);
    router.delete("/remove/:Id", verifyToken, remove_department);
    router.delete("/remove-multiple/", verifyToken, remove_multiple_department);
    router.patch("/trash/:Id", verifyToken, trash_department);
    router.patch("/trash-multiple", verifyToken, trash_multiple_department);

    export default router;
