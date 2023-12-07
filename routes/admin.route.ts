import express from "express";
import { authenticateAndAuthorize } from "../middleware/auth.middleware";
import { adminPanel } from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter.get("/admin-panel", authenticateAndAuthorize('admin'), adminPanel);

export default adminRouter;