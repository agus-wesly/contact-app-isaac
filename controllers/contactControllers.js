const Contact = require("../model/Contact.js");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().exec();
  if (!contacts) return res.status(204).json({ message: "No contact to display" });
  res.status(200).json(contacts);
};

const addNewContact = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({ message: "Firstname or lastname are required" });
  const newContact = await Contact.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  res.json(newContact);
};

const editContact = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: "Id required !" });
  const editedContact = await Contact.findOne({ _id: req.body.id }).exec();
  if (!editedContact) {
    return res.status(404).json({ error: "No contact found !!" });
  }
  if (!req?.body?.firstname && !req?.body?.lastname) return res.sendStatus(400);
  if (req?.body?.firstname) editedContact.firstname = req.body.firstname;
  if (req?.body?.lastname) editedContact.lastname = req.body.lastname;

  const response = await editedContact.save();
  res.status(200).json(response);
};

const deleteContact = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: "Id required !" });

  const deletedContact = await Contact.findOne({ _id: req.body.id }).exec();
  if (!deletedContact) {
    return res.status(404).json({ error: "No contact found !!" });
  }

  const result = await deletedContact.deleteOne({ _id: req.body.id });
  res.status(200).json(result);
};

const findData = async (req, res) => {
  const id = req?.params?.id;
  const requestedData = await Contact.findOne({ _id: id }).exec();
  if (!requestedData) return res.sendStatus(404);
  console.log(requestedData);
  res.status(200).json({
    message: `Data with username ${requestedData.firstname} founded `,
    contact: requestedData,
  });
};

module.exports = {
  getAllContacts,
  addNewContact,
  editContact,
  deleteContact,
  findData,
};
