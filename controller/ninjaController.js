const express = require("express");
const router = express.Router();
const Ninja = require("../model/ninjas");

//GET A LIST FROM NINJAS FROM THE DATABASE
router.get("/ninjas", (req, res, next) => {
  //   Ninja.find({}).then((ninjas) => {
  //     res.send(ninjas);
  //   });
  Ninja.aggregate()
    .near({
      near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      maxDistance: 100000,
      spherical: true,
      distanceField: "dist.calculated",
    })
    .then((ninjas) => {
      if (ninjas) {
        if (ninjas.length === 0) {
          return res.send({
            message:
              "Ninjas within distance can't be found.(Correct the longitude and latitude)",
          });
        }
        res.send(ninjas);
      }
    });
});

//ADD A NEW NINJA TO THE DATABASE
router.post("/ninjas", (req, res, next) => {
  //   console.log(req.body);
  //   var ninja = new Ninja(req.body);
  //   ninja.save();
  // This makes a new ninja json object and saves it to database
  Ninja.create(req.body)
    .then((ninja) => {
      res.send(ninja);
    })
    .catch(next);
});

//UPDATE NINJA THAT IN THE DATABASE
router.put("/ninjas/:id", (req, res, next) => {
  //   res.send({ type: "UPDATE" });
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then((ninja) => {
    res.send(ninja);
  });
});

//DELETE A NINJA FROM THE DATABASE
router.delete("/ninjas/:id", (req, res, next) => {
  //   res.send({ type: req.params.id });
  Ninja.findByIdAndDelete({ _id: req.params.id }).then(() => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
  });
});

module.exports = router;
