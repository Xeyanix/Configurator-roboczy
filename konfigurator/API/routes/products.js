const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
let motherboardslist = require("../common/consts/motherboard.js");
let cpu = require("../common/consts/cpu");
let ram = require("../common/consts/ram");
let ssd = require("../common/consts/ssd.js");
let charger = require("../common/consts/charger");
let gpu = require("../common/consts/gpu")
let Case = require("../common/consts/Case.js");

let shoppingList = [];

let motherboards = motherboardslist;
let cpus = cpu;
let rams = ram;
let ssds = ssd;
let chargers = charger;
let gpus = gpu;
let cases = Case;

router.get("/", (req, res) => {
  const allComponents = [
    ...motherboards.map((motherboard) => ({
      id: motherboard.id,
      name: motherboard.name,
      price: motherboard.price,
      type: 'Płyta główna', 
    })),
    ...cpus.map((cpu) => ({
      id: cpu.id,
      name: cpu.name,
      price: cpu.price,
      type: 'Procesor', 
    })),
    ...rams.map((ram) => ({
      id: ram.id,
      name: ram.name,
      price: ram.price,
      type: 'RAM',
    })),
    ...ssds.map((ssd) => ({
      id: ssd.id,
      name: ssd.name,
      price: ssd.price,
      type: 'SSD',
    })),
    ...chargers.map((charger) => ({
      id: charger.id,
      name: charger.name,
      price: charger.price,
      type: 'Charger',
    })),
    ...gpus.map((gpu) => ({
      id: gpu.id,
      name: gpu.name,
      price: gpu.price,
      type: 'GPU',
    })),
    ...cases.map((Case) => ({
      id: Case.id,
      name: Case.name,
      price: Case.price,
      type: 'Cases',
    })),

  ];

  res.status(200).json(allComponents);
});


router.get("/shoppingList", (req, res) => {
  const plainList = shoppingList.filter(
    (value) => Object.keys(value).length !== 0
  );
  setTimeout(() => {
    res
      .status(200)
      .json(
        plainList.map((product) => ({ id: product.id, name: product.name, price: product.price }))//tu dodajemy dodatkowe rzeczy w tablicy produktow
      );
  }, 1000);
});

router.post("/shoppingList/new", jsonParser, (req, res) => {
  shoppingList.push(req.body);
  setTimeout(() => {
    res.status(200).json(req.body);
  }, 1000);
});

router.delete("/shoppingList/:shoppingListId", jsonParser, (req, res) => {
  setTimeout(() => {
    res.status(200).json(req.body);
  }, 1000);
});

router.delete("/shoppingList", (req, res) => {
  shoppingList = []; // Czyszczenie całej listy zakupów
  setTimeout(() => {
    res.status(200).json({ message: "All products removed from shopping list" });
  }, 1000);

});

router.post("/new", jsonParser, (req, res) => {
  motherboards.push(req.body);
  res.status(200).json(req.body);
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

router.get("/ssds/:id", (req, res) => {
  const ssdId = req.params.id;
  const selectedSSD = ssds.find(
    (ssd) => ssd.id === parseInt(ssdId)
  );
  if (!selectedSSD) {
    return res.status(404).json({ error: "SSD not found" });
  }
  res.status(200).json(selectedSSD);
});

router.get("/chargers/:id", (req, res) => {
  const chargerId = req.params.id;
  const selectedCharger = chargers.find(
    (charger) => charger.id === parseInt(chargerId)
  );
  if (!selectedCharger) {
    return res.status(404).json({ error: "Charger not found" });
  }
  res.status(200).json(selectedCharger);
});

router.get("/gpus/:id", (req, res) => {
  const gpuId = req.params.id;
  const selectedGPU = gpus.find(
    (gpu) => gpu.id === parseInt(gpuId)
  );
  if (!selectedGPU) {
    return res.status(404).json({ error: "Charger not found" });
  }
  res.status(200).json(selectedGPU);
});

router.get("/cases/:id", (req, res) => {
  const caseId = req.params.id;
  const selectedCase = cases.find(
    (Case) => Case.id === parseInt(caseId)
  );
  if (!selectedCase) {
    return res.status(404).json({ error: "Case not found" });
  }
  res.status(200).json(selectedCase);
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
    shoppingList = shoppingList.filter((product) => product.id !== id);
    req.shoppingList = shoppingList;
  }

  next();

});

router.param("/new", (req, res, next, id) => {
  next();
});

module.exports = router;
