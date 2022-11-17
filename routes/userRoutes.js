const express = require('express');

const router = express.Router();
const Users = require('../model/UserModel');


router.get('/', async (req, res) => {
    const result = await Users.find({});
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const userID = Number.parseInt(req.params.id);
    const result = await Users.find({ user_id: userID });
    res.send(result);
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



router.post("/", async (req, res) => {
    try {
        const { user_id, rank, first_name, last_name, email, password } = req.body;
        const user = await Users.create({
            user_id,
            rank,
            first_name,
            last_name,
            email,
            password,
            watchlist: [],
        })
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;