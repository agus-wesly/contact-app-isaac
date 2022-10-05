const express = require("express");
const { getAllContacts, addNewContact, editContact, deleteContact, findData } = require("../controllers/contactControllers");
const router = express.Router();
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/handleRoles");

router.route("/")
.get(getAllContacts)
.post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), addNewContact)
.put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), editContact)
.delete(verifyRoles(ROLES_LIST.Admin), deleteContact);

router.get("/:id", findData);

module.exports = router;
