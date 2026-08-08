import express from "express";

import {
  addTeamMember,
  getTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/TeamController.js";

import upload from "../Middleware/ImageMulter.js";

const router = express.Router();

// Add Team Member
router.post(
  "/add",
  upload.single("image"),
  addTeamMember
);

// Get All Team Members
router.get("/", getTeamMembers);

// Get Single Team Member
router.get("/:id", getTeamMemberById);

// Update Team Member
router.put("/:id", updateTeamMember);

// Delete Team Member
router.delete("/:id", deleteTeamMember);

export default router;