const express = require("express");
const router = express.Router();
const { createCapsule, getUserCapsules, unlockCapsule } = require("../controller/capsuleController");

router.post("/create", createCapsule);
router.get("/user/:user_id", getUserCapsules);
router.put("/unlock/:capsule_id", unlockCapsule);

module.exports = router;
