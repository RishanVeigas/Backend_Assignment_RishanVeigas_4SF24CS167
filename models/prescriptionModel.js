const db = require("../models/db");


const createPrescription = (
  doctor_id,
  patient_id,
  prescription_details,
  callback,
) => {
  const query = `
        INSERT INTO prescriptions
        (doctor_id, patient_id, prescription_details)
        VALUES (?, ?, ?)
    `;

  db.run(query, [doctor_id, patient_id, prescription_details], callback);
};


const getPrescriptionsByDoctor = (doctor_id, callback) => {
  const query = `
        SELECT * FROM prescriptions
        WHERE doctor_id = ?
    `;

  db.all(query, [doctor_id], callback);
};


const getPrescriptionsByPatient = (patient_id, callback) => {
  const query = `
        SELECT * FROM prescriptions
        WHERE patient_id = ?
    `;

  db.all(query, [patient_id], callback);
};

const updatePrescription = (
  prescription_id,
  doctor_id,
  prescription_details,
  callback,
) => {
  const query = `
        UPDATE prescriptions
        SET prescription_details=?
        WHERE id = ? AND doctor_id = ?
    `;

  db.run(
    query,
    [prescription_details, prescription_id, doctor_id],
    callback,
  );
};

module.exports = {
  createPrescription,
  getPrescriptionsByDoctor,
  getPrescriptionsByPatient,
  updatePrescription,
};
