import express from "express";
import { addPatient, getPatients,getAllPatients, getPatientById,getPatientsByCenterId, deletePatient, updatePatient, dashboardPatients, searchPatients} from "../controllers/patient.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addPatient").post( addPatient);
router.route("/getPatients/:id").get( getPatients);
router.route("/getAllPatients/:id").get( getAllPatients);
router.route("/getPatientById/:id").put( getPatientById);
router.route("/getPatientsByCenterId/:id").get( getPatientsByCenterId);
router.route("/updatePatient/:id").post( updatePatient);
router.route("/deletePatient/:id").delete(deletePatient);
router.route("/dashboardPatients/:id").get( dashboardPatients);
router.route("/searchPatients/:id").post( searchPatients);

export default router;