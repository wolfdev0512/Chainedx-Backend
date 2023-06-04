const { firestore } = require("../config/firebase");

const getTimer = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting Timer= %s", id);

    const docRef = firestore.collection("timer").doc(id);
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

const updateTimer = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating Timer= %s", id);

    const { timer } = req.body;

    if (timer === null) {
      return res.status(400).send("Data are required");
    }
    console.log(timer);

    const docRef = firestore.collection("timer").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    if (timer) {
      updateData.timer = timer;
    }
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    const status = updatedDoc.data();
    res.json({ timer: status, id: updatedDoc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getTimer,
  updateTimer,
};
