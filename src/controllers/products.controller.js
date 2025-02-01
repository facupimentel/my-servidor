import productsManager from "../data/fs/products.fs.js";

const readOneProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.status(200).json({ response: one });
    }
  } catch (error) {
    const message = error.message || "api error";
    const status = error.status || 500;
    return res.status(status).json({ error: message });
  }
};

const readProducts = async (req, res) => {
  const { category } = req.query;
  const all = await productsManager.readAll(category);
  if (all.length > 0) {
    return res.status(200).json({ response: all });
  }
  return res.status(404).send("NOT FOUND POINT");
};

const createProduct = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const one = await productsManager.create(data);
  return res.status(201).json({ response: one });
};

const updateProducts = async (req, res) => {
  try {
    // de los requerimientos necesito el id y la data a actualizar
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateOne(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    const message = error.message || "api error";
    const status = error.status || 500;
    return res.status(status).json({ error: message });
  }
};

const destroyProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyOne(pid);
    return res.status(200).json({ response: one });
  } catch (error) {
    const message = error.message || "api error";
    const status = error.status || 500;
    return res.status(status).json({ error: message });
  }
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
};
