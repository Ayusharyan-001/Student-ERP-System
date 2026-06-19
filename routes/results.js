const express = require("express");

const router = express.Router();

const resultController =
require("../controllers/resultController");

router.get(
    "/",
    resultController.getResults
);

router.get(
    "/add",
    resultController.showAddForm
);

router.post(
    "/add",
    resultController.createResult
);

module.exports = router;