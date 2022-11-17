const express = require('express');

const router = express.Router();
const Users = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const result = await Users.find({});
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const userID = Number.parseInt(req.params.id);
    const result = await Users.find({ user_id: userID });
    res.send(result[0]);
});

router.put('/watchlist/:id', async (req, res) => {
    const { fac_id } = req.body;
    const userID = Number.parseInt(req.params.id);
    const DataUser = await Users.find({ user_id: userID });
    DataUser[0].watchlist.push(fac_id);
    const Block = [...new Set(DataUser[0].watchlist)];
    DataUser[0].watchlist = Block;
    console.log(DataUser[0].watchlist);
    const updateDatabase = await Users.updateOne(DataUser[0]);
    res.sendStatus(200);
});

router.put('/watchlist/delete/:id', async (req, res) => {
    const { fac_id } = req.body;
    const userID = Number.parseInt(req.params.id);
    const DataUser = await Users.find({ user_id: userID });

    if (DataUser[0].watchlist.includes(fac_id)) {
        const find = DataUser[0].watchlist.indexOf(fac_id);
        DataUser[0].watchlist.splice(find, 1)
    }
    const updateDatabase = await Users.updateOne(DataUser[0]);
    res.sendStatus(200, updateDatabase);
});



router.post("/register", async (req, res) => {
    try {
        const { user_id, rank, first_name, last_name, email, password } = req.body;
        if (!(user_id, rank, first_name, last_name, email, password)) {
            res.status(400).send('All input has required');
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            user_id,
            rank,
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            watchlist: [],
        })


        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        user.token = token

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;