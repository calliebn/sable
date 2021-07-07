const db = require('../models')

module.exports = {
    create: function (req, res) {
        console.log(req.body)
        db.User
            .create(req.body)
            .then(dbModel => {
                req.session.save(() => {
                    req.session.user_id = dbModel._id;
                    req.session.log_in = true;

                    res.status(200).json(dbModel);
                });
            })
            .catch(err => res.status(500).json(err));
    },

    findByUsername: function (req, res) {
        db.User
            .findByUsername(req.body.username)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    remove: function (req, res) {
        db.User
            .findByUsername({ _id: req.params.id })
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