const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  createPrescriptionController,
  getDoctorPrescriptionsController,
  getPatientPrescriptionsController,
  updatePrescriptionController,
} = require("../controllers/prescriptionController");

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("doctor"),
  createPrescriptionController,
);

router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorPrescriptionsController,
);
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientPrescriptionsController,
);

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("doctor"),
  updatePrescriptionController,
);

module.exports = router;
