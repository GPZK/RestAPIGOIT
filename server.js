const app = require("./app");
const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://GPZK:owuwvK2Mvh3UowkA@cluster0.5knkhyd.mongodb.net/db-contacts",
  {
    useUnifiedTopology: true,
  }
);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1)
  });
