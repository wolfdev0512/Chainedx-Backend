const { v4: uuidv4 } = require("uuid");
const { firestore, storage } = require("../config/firebase");

const addUser = async (req, res, next) => {
  try {
    console.log("Adding new User");

    const { name, email, profile, wallet, level } = req.body;
    const file = req.file;

    if (!name || !email || !profile || !wallet || !level || !file) {
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
        .collection("users")
        .add({ name, image: publicUrl, email, profile, wallet, level });
      const doc = await docRef.get();
      const user = doc.data();
      res.json({ user: user, id: doc.id });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    console.log("Getting all Users");
    const snapshot = await firestore.collection("users").get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ user: doc.data(), id: doc.id });
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getUser = async (req, res, next) => {
  try {
    const { wallet } = req.params;
    console.log("Getting employee= %s", wallet);

    const usersRef = firestore.collection("users");

    const querySnapshot = await usersRef.where("wallet", "==", wallet).get();

    const users = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      users.push({ user: doc.data(), id: doc.id });
    });

    if (!users.length > 0) {
      return res.status(404).send("User not found");
    }
    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateUser = async (req, res, next) => {
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Deleting employee= %s", id);
    const docRef = firestore.collection("users").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send("User not found");
    }
    await docRef.delete();
    res.send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
