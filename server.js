const app = require("./app");
const mongoose = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT

const connection = mongoose.connect( process.env.DB_URI
  ,
  {
    useUnifiedTopology: true,
  }
);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT || 3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1)
  });
