const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

async function hashThePassword(password) {
  return bcrypt.hash(password, 10);
}

const contact = new Schema( 
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);
user.pre("save", async function() {
  this.password = await hashThePassword(this.password);
  //not implemented changing the password
});
const User = mongoose.model("user", user);
const Contact = mongoose.model("Contact", contact);

module.exports = {
  Contact,
  User,
};
