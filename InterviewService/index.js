const express = require("express");
const app = express();
const dotEnv = require("dotenv");
dotEnv.config({path : "/configurations/config.env"});
const databaseConfiguration = require("configurations/databaseConfiguration");
const router = require("./routes/interviewRoutes");



databaseConfiguration()
    .then(()=>console.log("Interview Service Connected To Database"))
    .catch(()=>console.log("Interview Service Failed To Connect To Database"));


app.use(express.json());
app.use("/interview",router);

const PORT = 8001 || process.env.PORT;
app.listen(PORT , ()=>console.log(`InterviewService Server Started At PORT ${PORT}`));
