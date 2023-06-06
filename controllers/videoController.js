const { v4: uuidv4 } = require("uuid");
const { firestore, storage } = require("../config/firebase");

const getVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting Video= %s", id);

    const docRef = firestore.collection("video").doc(id);
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

const updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating Video= %s", id);

    const file = req.file;

    if (!file) {
      return res.status(400).send("Data are required");
    }

    const docRef = firestore.collection("video").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    const ext = file.originalname.split(".").pop();
    const filename = `${uuidv4()}.${ext}`;

    const blob = storage.file(filename);

    const publicUrl = await blob.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 7 * 86400 * 1000,
    });

    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Server error");
    });

    blobStream.on("finish", async () => {
      updateData.video = publicUrl;

      await docRef.update(updateData);
      const updatedDoc = await docRef.get();
      const white = updatedDoc.data();
      res.json({ white: white, id: updatedDoc.id });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getVideo,
  updateVideo,
};
