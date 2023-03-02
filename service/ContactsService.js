const {Contact} = require("./schemas");
const getContacts = async function() {
  return Contact.find();
};
const getContactsById = async function(id) {
  return Contact.findById(id);
};
const deleteContact = async function(id) {
  return Contact.findByIdAndDelete(id);
};
const createContact = async function(contact) {
  const createdContact = new Contact(contact);
  return Contact.create(createdContact);
};

const updateContact = async function(id, contact) {
  return Contact.updateOne({ _id: id }, contact).then(() =>
    Contact.findById(id)
  );
};

const patchStatus = async function (id, favorite){
    return Contact.updateOne({_id: id}, {favorite}).then(()=>Contact.findById(id))
}

module.exports = {
  getContacts,
  getContactsById,
  deleteContact,
  createContact,
  updateContact,
  patchStatus
};
