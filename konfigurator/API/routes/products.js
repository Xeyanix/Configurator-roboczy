const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
let motherboardslist = require("../common/consts/motherboard.js");
let cpu = require("../common/consts/cpu");
let ram = require("../common/consts/ram");

let shoppingList = [];

let motherboards = motherboardslist;
let cpus = cpu;
let rams = ram;


router.get("/", (req, res) => {
  const allComponents = [
    ...motherboards.map((motherboard) => ({
      id: motherboard.id,
      name: motherboard.name,
      type: 'Płyta główna', // Dodajemy pole "type", aby odróżnić płyty główne od CPU
    })),
    ...cpus.map((cpu) => ({
      id: cpu.id,
      name: cpu.name,
      type: 'Procesor', // Dodajemy pole "type", aby odróżnić CPU od płyt głównych
    })),
    ...rams.map((ram) => ({
      id: ram.id,
      name: ram.name,
      type: 'RAM', // Dodajemy pole "type", aby odróżnić RAM od płyt głównych i CPU
    })),
  ];

  res.status(200).json(allComponents);
});


router.get("/shoppingList", (req, res) => {
  const plainList = shoppingList.filter(
    (value) => Object.keys(value).length !== 0
  );
  setTimeout(() => {
    res.status(200).json(
      plainList.map((product) => ({ id: product.id, name: product.name }))
    );
  }, 3000);
});

router.post("/shoppingList/new", jsonParser, (req, res) => {
  shoppingList.push(req.body);
  setTimeout(() => {
    res.status(200).json(req.body);
  }, 3000);
});

router.get("/cpus/:id", (req, res) => {
  const cpuId = req.params.id;
  const selectedCpu = cpus.find(
    (cpu) => cpu.id === parseInt(cpuId)
  );
  if (!selectedCpu) {
    return res.status(404).json({ error: "CPU not found" });
  }
  res.status(200).json(selectedCpu);
});

router.get("/rams/:id", (req, res) => {
  const ramId = req.params.id;
  const selectedRam = rams.find(
    (ram) => ram.id === parseInt(ramId)
  );
  if (!selectedRam) {
    return res.status(404).json({ error: "RAM not found" });
  }
  res.status(200).json(selectedRam);
});


router.delete("/shoppingList", jsonParser, (req, res) => {
  shoppingList = []; // Czyść listę zakupów
  res.status(200).json({ message: "All items deleted from shopping list" });
});




router.post("/new", jsonParser, (req, res) => {
  motherboards.push(req.body);
  res.status(200).json(req.body);
});



router.get("/:id", (req, res) => {
  const motherboardId = req.params.id;
  const selectedMotherboard = motherboards.find(
    (motherboard) => motherboard.id === parseInt(motherboardId)
  );
  if (!selectedMotherboard) {
    return res.status(404).json({ error: "Motherboard not found" });
  }
  res.status(200).json(selectedMotherboard);
});

router
  .route("/:id")
  .get((req, res) => {
    const motherboardId = req.params.id;
    const selectedMotherboard = motherboards.find(
      (motherboard) => motherboard.id === motherboardId
    );
    if (!selectedMotherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }
    res.status(200).json(selectedMotherboard);
  })
  .put(jsonParser, (req, res) => {
    const idFromParams = req.params.id;
    const existingIndex = motherboards.findIndex(
      (product) => product.id === idFromParams
    );
    if (existingIndex !== -1) {
      motherboards[existingIndex] = req.body;
      res.status(200).json({ message: `Motherboard with ID ${idFromParams} updated` });
    } else {
      res.status(404).json({ error: "Motherboard not found" });
    }
  })
  .delete((req, res) => {
    const idFromParams = req.params.id;
    const existingIndex = motherboards.findIndex(
      (product) => product.id === idFromParams
    );
    if (existingIndex !== -1) {
      motherboards.splice(existingIndex, 1);
      res.status(200).json({ message: `Motherboard with ID ${idFromParams} deleted` });
    } else {
      res.status(404).json({ error: "Motherboard not found" });
    }
  });

router.param("id", (req, res, next, id) => {
  req.productsList = motherboards;
  if (req.method === "GET") {
    req.productsToReturn = motherboards.find((product) => product.id === id);
  }
  if (req.method === "DELETE") {
    req.productToDelete = motherboards.find((product) => product.id === id);
  }

  next();
});

router.param("shoppingListId", (req, res, next, id) => {
  req.shoppingList = shoppingList;
  if (req.method === "DELETE") {
    req.productToDelete = shoppingList.find((product) => product.id === id);
  }

  next();
});

module.exports = router;
