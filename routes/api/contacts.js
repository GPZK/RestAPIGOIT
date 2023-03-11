const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const {
  validatePost,
  validatePut,
  validateStatusPatch,
} = require("../../models/validation");

const { auth } = require("../../service/jwtAuthStuff");

const router = express.Router();

router.get("/", auth, listContacts);

router.get("/:contactId", auth, getContactById);

router.post("/", auth, validatePost, addContact);

router.delete("/:contactId", auth, removeContact);

router.put("/:contactId", auth, validatePut, updateContact);

router.patch(
  "/:contactId/favorite",
  auth,
  validateStatusPatch,
  updateStatusContact
);

module.exports = router;
