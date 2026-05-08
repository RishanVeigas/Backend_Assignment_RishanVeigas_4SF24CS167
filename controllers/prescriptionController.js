const {
    createPrescription,
    getPrescriptionsByDoctor,
    getPrescriptionsByPatient,
    updatePrescription
} = require("../models/prescriptionModel");

const createPrescriptionController = (req, res) => {

    try {

        const doctor_id = req.user.id;

        const {
            patient_id,
            prescription_details
        } = req.body;

        // Validation
        if (!patient_id || !prescription_details) {
            return res.status(400).json({
                message: "Patient ID and prescription details  are required"
            });
        }

        createPrescription(
            doctor_id,
            patient_id,
            prescription_details,
            function (err) {

                if (err) {
                    return res.status(500).json({
                        message: "Failed to create prescription"
                    });
                }

                res.status(201).json({
                    message: "Prescription created successfully"
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


const getDoctorPrescriptionsController = (req, res) => {

    try {

        const doctor_id = req.user.id;

        getPrescriptionsByDoctor(doctor_id, (err, prescriptions) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to fetch prescriptions"
                });
            }

            res.status(200).json({
                prescriptions
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET PATIENT PRESCRIPTIONS
const getPatientPrescriptionsController = (req, res) => {

    try {

        const patient_id = req.user.id;

        getPrescriptionsByPatient(patient_id, (err, prescriptions) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to fetch prescriptions"
                });
            }

            res.status(200).json({
                prescriptions
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updatePrescriptionController = (req, res) => {

    try {

        const prescription_id = req.params.id;

        const doctor_id = req.user.id;

        const prescriptionDetails = req.body;

        // Validation
        if (!prescriptionDetails) {
            return res.status(400).json({
                message: "Prescription details are required"
            });
        }

        updatePrescription(
            prescription_id,
            doctor_id,
            prescriptionDetails,
            function (err) {

                if (err) {
                    return res.status(500).json({
                        message: "Failed to update prescription"
                    });
                }

                res.status(200).json({
                    message: "Prescription updated successfully"
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
createPrescriptionController,
getDoctorPrescriptionsController,
getPatientPrescriptionsController,
updatePrescriptionController
};