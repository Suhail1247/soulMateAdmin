// Import necessary modules and libraries
import { Router } from "express";
import * as controller from "../controller/controller.js";
import Auth from "../middleware/auth.js";
const router = Router();

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/getUsers").get(controller.getUsers);
router.route("/getAdmin").get(Auth, controller.getAdmin);
router.route("/createPlan").post(Auth, controller.createPlan);
router.route("/getPlan").get(Auth, controller.getPlan);
router.route("/deletePlan/:id").delete(Auth, controller.deletePlan);
router.route('/submitDetails/:userId').post(Auth,controller.submitDetails);
export default router;
