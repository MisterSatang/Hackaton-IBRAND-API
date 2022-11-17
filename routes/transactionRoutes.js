const express = require('express');

const router = express.Router();
const Transaction = require('../model/TransactionModel');

router.get('/', async (req, res) => {
    const result = await Transaction.find({});
    console.log(result.length);
    res.send(result);
});

router.post("/", async (req, res) => {
    try {
        const { transaction_id, fac_id, user_id, step, product, qualityComment_customer, qualityComment_factory, offer_price, testing_price, deliver_price, pakaging_choose, file_pakaging, location_customer } = req.body;
        const transaction = await Transaction.create({
            transaction_id,
            fac_id,
            user_id,
            step,
            product,
            qualityComment_customer,
            qualityComment_factory,
            offer: {
                offer_price,

            },
            testing: {
                testing_price,
                deliver_price,
            },
            pakdaging: {
                pakaging_choose,
                file_pakaging,

            },
            location_customer,
        })
        res.status(201).json(transaction);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
