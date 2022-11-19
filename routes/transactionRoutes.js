const { query } = require('express');
const express = require('express');

const router = express.Router();
const Transaction = require('../model/TransactionModel');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await Transaction.find({});
    res.send(result);
});

router.get('/byuser/', auth, async (req, res) => {
    const result = await Transaction.find({ user_id: req.user.user_id });
    res.send(result);
});

router.post("/", async (req, res) => {
    try {
        const { fac_id, user_id, user_name, step, product, qualityComment_customer, qualityComment_factory, offer_price, testing_price, deliver_price, pakaging_choose, file_pakaging, location_customer } = req.body;
        const transaction = await Transaction.create({
            fac_id,
            user_id,
            user_name,
            step,
            product,
            qualityComment_customer,
            qualityComment_factory,
            offer_price,
            testing_price,
            deliver_price,
            pakaging_choose,
            file_pakaging,
            location_customer,
        })
        res.status(201).json(transaction);
    } catch (err) {
        console.log(err);
    }
});

router.put('/update/:id', async (req, res) => {
    const transactionID = req.params.id;
    const update = req.query.update;
    const { value } = req.body;
    const data = {
        $set: {
            [update]: value,
        }
    }
    const updateDatabase = await Transaction.updateOne({ _id: transactionID }, data);
    res.sendStatus(200, updateDatabase);
});

module.exports = router;
