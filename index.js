const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("BD CONNECTED");
  })
  .catch((e) => {
    console.log("ERROR", e);
  });

const Contact = require("./models/Contact");

const addContact = async (name, age, favoriteFoods) => {
  const contact = await Contact.create({ name, age, favoriteFoods });
  console.log(contact);
};
//addContact("fatma",17,["lamp"]);
const findAll = async () => {
  const contacts = await Contact.find({});
  console.log(contacts);
};
//findAll()
//findOne
const findPr = async (food) => {
  const contacts = await Contact.find({ favoriteFoods: food });
  console.log(contacts);
};
//findPr("couscous")
//findById
const findID = async (id) => {
  const contacts = await Contact.findById(id);
  console.log(contacts);
};
//findID("61f93e9f4864ce22f794f3d8")
//Updates by Running Find, Edit, then Save
const upDate = async (nom) => {
  const contacts = await Contact.findOneAndUpdate({ name: nom }, { age: 30 });
  console.log(contacts);
};
//upDate("marwen")
// Delete One Document Using model.findByIdAndRemove
const findDelete = async (id) => {
  const contacts = await Contact.findByIdAndDelete(id);
  console.log(contacts);
};
findDelete("61f93e7a662690e5927743a2");
//deleteMany
const deletefatma = async () => {
  const contacts = await Contact.deleteMany({ name: "fatma" });
  console.log(contacts);
};
//deletefatma();
// Chain Search Query Helpers to Narrow Search Results
Contact.find({ favoriteFoods: "pizza" })
  .limit(2)
  .sort({ name: 1 })
  .select({ age: false })
  .exec((err, data) => {
    if (err) {
      console.log(err);
    } else console.log(data);
  });

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
