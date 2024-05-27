    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */
    
    import express from 'express';
    import { get_all_product, get_product, create_product, update_product, remove_product, remove_multiple_product, trash_product, trash_multiple_product } from '../../controllers/index.js'
    import { verifyToken } from '../../middleware/index.js'

    const router = express.Router();

    // Product
    router.get("/", verifyToken, get_all_product);
    router.get("/details/:Id", verifyToken, get_product);
    router.post("/create", verifyToken, create_product);
    router.patch("/update/:Id", verifyToken, update_product);
    router.delete("/remove/:Id", verifyToken, remove_product);
    router.delete("/remove-multiple/", verifyToken, remove_multiple_product);

    router.patch("/trash/:Id", verifyToken, trash_product);
    router.patch("/trash-multiple", verifyToken, trash_multiple_product);

    export default router;
