const userRoute = require("./routes/user-routes.js")
const dashboardMenusRoute = require("./routes/dashboard-menus-routes.js")
const participantRoute = require("./routes/participant-routes.js")
const express = require('express');
const mongoose = require('mongoose');

const {Schema} = mongoose;
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();

const validateToken = require("./Middleware/ValidateTokenHandler");


const app = express();



app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight explicitly
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL

console.log("Mongo URL:", MONGO_URL);

mongoose.connect(MONGO_URL).then(()=> {
  console.log("mongo database connected successfull")
  app.listen(PORT,() => {
    console.log(`SERVER  is running on port ${PORT}`)
  })
}).catch(err => console.log(err));


app.use("/api/user",userRoute)


app.use("/api/participant",participantRoute)
app.use("/api/participants",participantRoute)

app.use("/api",dashboardMenusRoute)

const tagRoutes = require("./routes/tag-routes");
app.use("/api",tagRoutes)


const appointmentsRoutes = require("./routes/appointment-routes");
app.use("/api",validateToken,appointmentsRoutes)


const communicationRoutes = require("./routes/communication-routes");
app.use("/api", communicationRoutes);


const fileRoutes = require("./routes/file-routes");
app.use("/api", fileRoutes);

const progressNoteRoutes = require("./routes/progress-note-routes");
app.use("/api", progressNoteRoutes);

const caseRoutes = require("./routes/case-routes");
app.use("/api", caseRoutes);

const supportActivityRoutes = require("./routes/support-activity-routes");
app.use("/api", supportActivityRoutes);

const invoiceRoutes = require("./routes/invoice-routes");
app.use("/api", invoiceRoutes);

const paymentRoutes = require("./routes/payment-routes");
app.use("/api", paymentRoutes);

const practitionerAccessRoutes = require("./routes/practitioner-access-routes");
app.use("/api", practitionerAccessRoutes);

/**
 * below is the get about us list
 */
const aboutUsSchema = new Schema({
  name:String
},{ versionKey: false,
  collection: "hear-about-us-list" 
 })

const modelHearAboutUsList = mongoose.model("HearAboutUsList",aboutUsSchema)

app.get(
  "/api/hear-about-us-list",
  async (req, res) => {
    try {
      const result = await modelHearAboutUsList.find();
      res.status(200).json({
        statusCode: 1000,
        message: "Hear about us list fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error fetching hear-about-us-list:", error);
      res.status(500).json({
        statusCode: 1001,
        message: "Internal server error",
        data: {},
      });
    }
  }
);

/**
 * below is the get service provide list
 */
const serviceProvideSchema = new Schema({
  name:String
},{ versionKey: false,
  collection: "service-provide" 
 })

const modelServiceProvideSchema = mongoose.model("ServiceProvideList",serviceProvideSchema)

app.get("/api/service-provide", async (req, res) => {
  try {
      const result = await modelServiceProvideSchema.find();
      res.status(200).json({
        statusCode: 1000,
        message: "service provider list fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error fetching hear-about-us-list:", error);
      res.status(500).json({
        statusCode: 1001,
        message: "Internal server error",
        data: {},
      });
    }
});


/**
 * below is the get service provide list
 */
const sizeOfTeamSchema = new Schema({
  name:String
},{ versionKey: false,
  collection: "size-of-team" 
 })

const modelSizeOfTeam = mongoose.model("SizeOfTeam",sizeOfTeamSchema)

app.get("/api/size-of-team", 
  async (req, res) => {
    try {
      const result = await modelSizeOfTeam.find();
      res.status(200).json({
        statusCode: 1000,
        message: "team size list fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error fetching hear-about-us-list:", error);
      res.status(500).json({
        statusCode: 1001,
        message: "Internal server error",
        data: {},
      });
    }
}); 

app.get("/login", async (req, res) => {
  try {
    const result = await modelSizeOfTeam.find();
    res.json(result);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


