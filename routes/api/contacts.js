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

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validatePost, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validatePut, updateContact);

router.patch("/:contactId/favorite", validateStatusPatch, updateStatusContact);

module.exports = router;
