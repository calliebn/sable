const { response } = require("express");
const db = require("../models");

module.exports = {
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => {
                req.session.save(() => {
                    req.session.user_id = dbModel._id;
                    req.session.log_in = true;
                    res.status(200).json(dbModel);
                });
            })

            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            });
    },

    findByUsername: function (req, res) {
        db.User.findOne({ username: req.body.username })
            .then(async (user) => {
                console.log(user)
                if (user) {
                    const pass = await user.correctPassword(req.body.password)
                    if (pass) {
                        req.session.log_in = true
                        res.status(200).send({ message: "Successfully logged in" });
                    } else {
                        console.log("Error")
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            });
    },

    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => {
                if (req.session.log_in) {
                    req.session.destroy(() => {
                        res.status(204).end();
                    });
                } else {
                    res.status(404).end();
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => re.status(422).json(err));
    }
};