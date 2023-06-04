const { firestore } = require("../config/firebase");

const getDocs = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting Docs= %s", id);

    const docRef = firestore.collection("docs").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }
    res.json({ docs: doc.data(), id: doc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateDocs = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating Docs= %s", id);

    const { docs } = req.body;

    if (docs === null) {
      return res.status(400).send("Data are required");
    }
    console.log(docs);

    const docRef = firestore.collection("docs").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    if (docs) {
      updateData.docs = docs;
    }
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    const status = updatedDoc.data();
    res.json({ docs: status, id: updatedDoc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getDocs,
  updateDocs,
};
