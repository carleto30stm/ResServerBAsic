import { Router } from "express";
import { get } from "../controllers/userController.js";

const router = Router();


router.get('/',get)

export default router;