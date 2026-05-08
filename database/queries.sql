-- VIEW ALL USERS
SELECT *
FROM users;
-- VIEW ALL PRESCRIPTIONS
SELECT *
FROM prescriptions;
-- REGISTER DOCTOR
INSERT INTO users (
        name,
        email,
        password,
        role
    )
VALUES (
        "Dr. Amit Kulkarni",
        "amit@kulkarni",
        "amitkulkarni@gmail.com",
        "doctor"
    );
-- REGISTER PATIENT
INSERT INTO users (
        name,
        email,
        password,
        role
    )
VALUES (
        "Amit Kumar",
        "amit@kumar",
        "amitkumar@gmail.com",
        "patient"
    );
-- CREATE PRESCRIPTION
INSERT INTO prescriptions (
        doctor_id,
        patient_id,
        prescription_details
    )
VALUES (
        3,
        3,
        'Vitamin D',
        '1 tablet daily',
        'Drink more water'
    );
-- GET PRESCRIPTIONS BY DOCTOR
SELECT *
FROM prescriptions
WHERE doctor_id = 3;
-- GET PRESCRIPTIONS BY PATIENT
SELECT *
FROM prescriptions
WHERE patient_id = 2;
-- UPDATE PRESCRIPTION
UPDATE prescriptions
SET medicine = 'DOLO650',
    dosage = '3 times daily',
    notes = 'Take after meals'
WHERE id = 1;