const mongoose = require("mongoose");
const { Schema } = mongoose;

const participantSchema = new Schema ({

    // ───────── BASIC INFO ─────────
    title: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, minlength: 2, maxlength: 30, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, minlength: 2, maxlength: 30, trim: true },
    preferredName: { type: String, required: true, trim: true },
    
    // ───────── DOB ─────────
    day: { type: Number, required: true, min: 1, max: 31 },
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true, min: 1900 },

    // ───────── PERSONAL ─────────
    sex: { type: String, required: true },
    genderIdentity: { type: String, required: true },
    pronouns: { type: String, required: true },
    occupation: { type: String, required: true },

    // ───────── MEDICAL NOTES ─────────
    alert: { type: String, maxlength: 1000 },
    otherDetails: { type: String },

    // ───────── TAGS ─────────

    tags: {
        type: [String], // array of strings
        required: false,
        default: []
    },

    // ───────── COMMUNICATION ─────────
    email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ]
    },
    phoneNumber: {
    type: String,
    required: true,
    trim: true
    },
    appointmentCommunicationPreferences:{
        type:String,
        required:true,
        trim:true,
    },

    // ───────── ADDRESS ─────────
    address: {
        address1:String,
        address2:String,
        address3:String,
        street: String,
        cityTown: String,
        stateRegion: String,
        postalZipCode: String,
        country: String,
        timeZone: String
    },

    // ───────── CONSENT ─────────
    privacyPolicyStatus:{
        type:Boolean,
        required:true
    },

    // ───────── MEDICATIONS ─────────
    medications: {
        name: String,
        frequency:String
      },

    allergies: [
      {
        name: String,
        description: String
      }
    ],

    intolerances: [
      {
        description: String
      }
    ],

    // ───────── MEDICARE ─────────
    medicare: {
      cardNumber: String,
      referenceNumber: String,
      expiryMonth: String,
      expiryYear: Number
    },

    /* ───────── MEDICARE CLAIMANT ───────── */
    medicareClaimant: {
      firstName: String,
      lastName: String,

      dob: {
        day: Number,
        month: String,
        year: Number
      },

      cardNumber: String,
      referenceNumber: String,

      expiry: {
        month: Number,
        year: String
      }
    },

    /* ───────── DVA DETAILS ───────── */
    dva: {
      veteransFileNumber: String,
      sex: Boolean
    },

    /* ───────── PRIVATE HEALTH ───────── */
    privateHealthInsurance: {
      healthFund: String
    },

    /* ───────── NDIS DETAILS ───────── */
    ndis: {
      ndisNumber: String,
      planStartDate: String,
      planEndDate: String,
      diagnosis: String,
      fundManagement: String,

      planNominee: {
        firstName: String,
        lastName: String
      },

      contact: {
        code: String,
        mobile: String,
        email: String
      }
    },

    /* ───────── EMERGENCY CONTACT ───────── */
    emergencyContact: {
      fullName: String,
      relationship: String,
      phone: String
    },

    /* ───────── INVOICING ───────── */
    invoicing: {
        extraInvoiceDetails: String,
        contact: String,
        invoiceReminderPreference: String
    },

    /* ───────── RELATED PARTICIPANTS ───────── */
    relatedParticipants: [
    {
        participantId: String,
        relationship: { type: String, trim: true }
    }
    ],

/* ───────── ASSOCIATED CONTACTS ───────── */
    associatedContacts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact"
    }
    ],

/* ───────── REFERRAL SOURCE ───────── */
    referralSource: {
        referralType: String,
        referrer: String,
        information: String
    },

},
{ timestamps: true }
);

module.exports = mongoose.model("participant",participantSchema);
