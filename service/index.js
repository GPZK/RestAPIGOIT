const mongoose = require("mongoose");
const Contact = require("./schemas");
const getContacts = async function() {
  return Contact.find();
};
const getContactsById = async function(id) {
  return Contact.findById(id);
};
const deleteContact = async function(id) {
  return Contact.findByIdAndDelete(id);
};
const createContact = async function(name, email, phone, favorite) {
    let isfavorite = favorite ? true : false ;
  const createdContact = new Contact({
    name: name,
    email: email,
    phone: phone,
    favorite: isfavorite,
  });
  return Contact.create(createdContact);
};
const updateContact = async function(id, { name, phone, email, favorite }) {
  return Contact.updateOne({ _id: id }, { name, phone, email, favorite }).then(() =>
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
