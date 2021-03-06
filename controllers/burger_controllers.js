const express = require("express");
const burger = require("../models/burger");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  console.log("GET ROUTE");
  burger.all(function (data) {
    console.log("GET: ", data);
    var hbsObject = {
      burger: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create(["name", "sleepy"], [req.body.name, req.body.sleepy], function (
    result
  ) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {
      sleepy: req.body.sleepy,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// Export routes for server.js to use.
module.exports = router;
