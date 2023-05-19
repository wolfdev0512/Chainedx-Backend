const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating employee= %s", id);

    const { name, email, profile, wallet, level } = req.body;
    const file = req.file;

    if (!name || !email || !profile || !wallet || !level || !file) {
      return res.status(400).send("Data are required");
    }

    const docRef = firestore.collection("users").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    if (name) {
      updateData.name = name;
      updateData.email = email;
      updateData.profile = profile;
      updateData.wallet = wallet;
      updateData.level = level;
    }

    if (file) {
      const ext = file.originalname.split(".").pop();
      const filename = `${uuidv4()}.${ext}`;

      const blob = storage.file(filename);
      const blobStream = blob.createWriteStream();

      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Server error");
      });

      blobStream.on("finish", async () => {
        const publicUrl = `https://storage.googleapis.com/${storage.name}/${filename}`;
        updateData.image = publicUrl;
        await docRef.update(updateData);
        const updatedDoc = await docRef.get();
        const user = updatedDoc.data();
        res.json({ user: user, id: updatedDoc.id });
      });

      blobStream.end(file.buffer);
    } else {
      await docRef.update(updateData);
      const updatedDoc = await docRef.get();
      const user = updatedDoc.data();
      res.json({ user: user, id: updatedDoc.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  updateStatus,
};
