import express from "express";
import { addReport, getReports,getAllReports, getReportById, deleteReport, updateReport, dashboardReports, searchReports} from "../controllers/report.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addReport").post( addReport);
router.route("/getReports/:id").get( getReports);
router.route("/getAllReports/:id").get( getAllReports);
router.route("/getReportById/:id").put( getReportById);
router.route("/updateReport/:id").post( updateReport);
router.route("/deleteReport/:id").delete(deleteReport);
router.route("/dashboardReports/:id").get( dashboardReports);
router.route("/searchReports/:id").post( searchReports);

export default router;