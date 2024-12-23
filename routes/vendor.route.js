import express from "express";
import { addVendor, getVendors, getVendorById, deleteVendor, updateVendor} from "../controllers/vendor.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addVendor").post( addVendor);
router.route("/getVendors").get( getVendors);
router.route("/getVendorById/:id").put( getVendorById);
router.route("/updateVendor/:id").post( updateVendor);
router.route("/deleteVendor/:id").delete(deleteVendor);

export default router;