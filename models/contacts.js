const ctrl = require("../service/index");

const listContacts = async (req, res) => {
  const contacts = await ctrl.getContacts();
  return res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await ctrl.getContactsById(contactId);
  if (!result) return res.status(404).json({ message: "Not found" });
  return res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await ctrl.deleteContact(contactId);
  if (result) return res.status(200).json({ message: "contact deleted" });
  return res.status(404).json({ message: "Not found" });
};

const addContact = async (req, res) => {
  const result = await ctrl.createContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const contactId = String(req.params.contactId);
  const result = await ctrl.updateContact(contactId, req.body);
  return res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;
  const result = await ctrl.patchStatus(contactId, favorite);
  if (result) return res.status(200).json(result);
  return res.status(404).json({ "message ": " Not found " });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
