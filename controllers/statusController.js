const { firestore, storage } = require("../config/firebase");

const getStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting Faq= %s", id);

    const docRef = firestore.collection("status").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }
    res.json({ status: doc.data(), id: doc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating Status= %s", id);

    const { buyToken, docs, faq, team } = req.body;

    if (buyToken === null || docs === null || faq === null || team === null) {
      return res.status(400).send("Data are required");
    }
    console.log(buyToken, docs, faq, team);

    const docRef = firestore.collection("status").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    if (buyToken) {
      updateData.buyToken = buyToken;
      updateData.docs = docs;
      updateData.faq = faq;
      updateData.team = team;
    }
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    const status = updatedDoc.data();
    res.json({ status: status, id: updatedDoc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  updateStatus,
  getStatus,
};
