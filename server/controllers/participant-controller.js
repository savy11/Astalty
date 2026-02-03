const CreateParticipantModel = require("../models/participant-model")
const safeParse = require("../utils/safeParse");

const create = async (req, res) => {
  try {

    const body = req.body;

    // ✅ Extract fields FIRST
    const email = body.email?.toLowerCase();
    const phoneNumber = body.phoneNumber;

    // ✅ Check if email already exists
    const emailExists = await CreateParticipantModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        statusCode: 1002,
        message: "Email already exists",
        data: {}
      });
    }

    // ✅ Check if phone number already exists
    const phoneExists = await CreateParticipantModel.findOne({ phoneNumber });
    if (phoneExists) {
      return res.status(400).json({
        statusCode: 1002,
        message: "Phone number already exists",
        data: {}
      });
    }

  

    const participantData = {
      // ───────── BASIC INFO ─────────
      title: body.title,
      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
      preferredName: body.preferredName,

      // ───────── DOB ─────────
      day: Number(body.day),
      month: Number(body.month),
      year: Number(body.year),

      // ───────── PERSONAL ─────────
      sex: body.sex,
      genderIdentity: body.genderIdentity,
      pronouns: body.pronouns,
      occupation: body.occupation,

      // ───────── MEDICAL NOTES ─────────
      alert: body.alert,
      otherDetails: body.otherDetails,

      // ───────── REQUIRED FIELDS ─────────
      email:body.email,
      phoneNumber:body.phoneNumber,
      appointmentCommunicationPreferences:
        body.appointmentCommunicationPreferences,

      privacyPolicyStatus:
        body.privacyPolicyStatus === "true",

      // ───────── ARRAYS / OBJECTS (JSON PARSE) ─────────
      tags: safeParse(body.tags, []),
      address: safeParse(body.address, {}),
      medications: safeParse(body.medications, []),
      allergies: safeParse(body.allergies, []),
      intolerances: safeParse(body.intolerances, []),

      medicare: safeParse(body.medicare, {}),
      medicareClaimant: safeParse(body.medicareClaimant, {}),
      dva: safeParse(body.dva, {}),
      privateHealthInsurance: safeParse(body.privateHealthInsurance, {}),
      ndis: safeParse(body.ndis, {}),
      emergencyContact: safeParse(body.emergencyContact, {}),
      invoicing: safeParse(body.invoicing, {}),
      referralSource: safeParse(body.referralSource, {}),

      relatedParticipants: safeParse(body.relatedParticipants, []),
      associatedContacts: safeParse(body.associatedContacts, [])
    };

    // create participant
    const participant = new CreateParticipantModel(participantData);

    const savedParticipant = await participant.save();

    return res.status(201).json({
      statusCode: 1000,
      message: "Participant created successfully",
      data: savedParticipant
    });

  } catch (error) {
    return res.status(400).json({
      statusCode: 1001,
      message: "Validation failed",
      error: error.message
    });
  }
};

// FETCH ALL PARTICIPANTS
const fetch = async (req, res) => {
  try {
    const participants = await CreateParticipantModel.find();

    return res.status(200).json({
      statusCode: 1000,
      message: "Participants fetched successfully",
      data: participants
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 1001,
      message: "Participants fetch failed",
      error: error.message
    });
  }
};

module.exports = {
  create,fetch
};
