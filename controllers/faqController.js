const { firestore, storage } = require("../config/firebase");

const addFaq = async (req, res, next) => {
  try {
    console.log("Adding new Faq");

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send("Data are required");
    }

    const docRef = await firestore.collection("faqs").add({ question, answer });
    const doc = await docRef.get();
    const faq = doc.data();
    res.json({ faq: faq, id: doc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllFaqs = async (req, res, next) => {
  try {
    console.log("Getting all Faqs");
    const snapshot = await firestore.collection("faqs").get();
    const faqs = [];
    snapshot.forEach((doc) => {
      faqs.push({ team: doc.data(), id: doc.id });
    });
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getFaq = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting Faq= %s", id);

    const docRef = firestore.collection("faqs").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }
    res.json({ faq: doc.data(), id: doc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateFaq = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating Faq= %s", id);

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send("Data are required");
    }

    const docRef = firestore.collection("faqs").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    if (question) {
      updateData.question = question;
      updateData.answer = answer;
    }
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    const faq = updatedDoc.data();
    res.json({ faq: faq, id: updatedDoc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteFaq = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Deleting team= %s", id);
    const docRef = firestore.collection("faqs").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send("User not found");
    }
    await docRef.delete();
    res.send("Team deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  addFaq,
  getAllFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
};
