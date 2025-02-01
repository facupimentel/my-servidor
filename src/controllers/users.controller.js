import usersManager from "../data/fs/users.fs.js";

const readUsers = async (req, res) => {
  try {
    const { data } = req.body;
    const one = await usersManager.readAll(data);
    if (one.length > 0) {
      return res.status(200).json({ response: one });
    }
    return res.status(404).send("NOT FOUND");
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};

const readOneUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    if (one) {
      return res.status(200).json({ response: one });
    }
  } catch (error) {
    const message = error.message || "api error";
    const status = error.status || 500;
    return res.status(status).json({ error: message });
  }
};

const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) {
      const error = new Error("type email");
      error.status = 400;
      throw error;
    }
    if (!data.password) {
      const error = new Error("type password");
      error.status = 400;
      throw error;
    }
    if (!data.age) {
      const error = new Error("type age");
      error.status = 400;
      throw error;
    }
    if (data.age < 18) {
      const error = new Error("at least 18");
      error.status = 400;
      throw error;
    }
    const one = await usersManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    const message = error.message || "api error";
    const status = error.status || 500;
    return res.status(status).json({ error: message });
  }
};

const updateUser = async (req, res) => {
  try {
    // de los requerimientos necesito el id y la data a actualizar
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.updateOne(uid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    const message = error.message || "api error";
    const status = error.status || 500;
    return res.status(status).json({ error: message });
  }
};


const destroyUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyOne(uid);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};

export {readUsers, createUser, destroyUser, updateUser, readOneUser}