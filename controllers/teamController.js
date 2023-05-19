const { v4: uuidv4 } = require("uuid");
const { firestore, storage } = require("../config/firebase");

const addTeam = async (req, res, next) => {
  try {
    console.log("Adding new Team");

    const { name, profile, wallet, role } = req.body;
    const file = req.file;

    if (!name || !profile || !wallet || !role || !file) {
      return res.status(400).send("Data are required");
    }

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
      const docRef = await firestore
        .collection("teams")
        .add({ name, image: publicUrl, profile, wallet, role });
      const doc = await docRef.get();
      const team = doc.data();
      res.json({ team: team, id: doc.id });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllTeams = async (req, res, next) => {
  try {
    console.log("Getting all Teams");
    const snapshot = await firestore.collection("teams").get();
    const teams = [];
    snapshot.forEach((doc) => {
      teams.push({ team: doc.data(), id: doc.id });
    });
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting team= %s", id);

    const docRef = firestore.collection("teams").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }
    res.json({ team: doc.data(), id: doc.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Updating team= %s", id);

    const { name, profile, wallet, role } = req.body;
    const file = req.file;

    if (!name || !profile || !wallet || !role || !file) {
      return res.status(400).send("Data are required");
    }

    const docRef = firestore.collection("teams").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    let updateData = {};

    if (name) {
      updateData.name = name;
      updateData.profile = profile;
      updateData.wallet = wallet;
      updateData.role = role;
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
        const team = updatedDoc.data();
        res.json({ team: team, id: updatedDoc.id });
      });

      blobStream.end(file.buffer);
    } else {
      await docRef.update(updateData);
      const updatedDoc = await docRef.get();
      const team = updatedDoc.data();
      res.json({ user: team, id: updatedDoc.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Deleting team= %s", id);
    const docRef = firestore.collection("teams").doc(id);
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
  addTeam,
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
