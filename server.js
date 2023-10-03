//Express.js for routing, a MongoDB database, and the Mongoose ODM
// optionally use a JavaScript date library of your choice or the native JavaScript Date object to format timestamps
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
// const moment = require("moment");
// function formatDate(createdAt) {
//   return moment(createdAt).format(`MM-DD-YYYY`);
// }
// console.log(formatDate("2023-10-03T22:30:48.966Z"));
