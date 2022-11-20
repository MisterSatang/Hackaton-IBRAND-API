const { query } = require('express');
const express = require('express');

const router = express.Router();
const Transaction = require('../model/TransactionModel');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await Transaction.find({});
    res.send(result);
});

router.get('/find_tranid/:tran_id', auth, async (req, res) => {
    const transactionID = req.params.tran_id;
    const result = await Transaction.findById({ _id: transactionID });
    res.send(result);
});

router.get('/byuser/', auth, async (req, res) => {
    const result = await Transaction.find({ user_id: req.user.user_id });
    res.send(result);
});

router.get('/byfac/:fac_id', async (req, res) => {
    const facId = Number.parseInt(req.params.fac_id);
    const result = await Transaction.find({});
    const transaction = result.filter((fac) => fac.fac_id == facId);
    console.log(transaction.length);
    res.send(transaction);
});

router.get('/byfac/onproduct/:fac_id', async (req, res) => {
    const facId = Number.parseInt(req.params.fac_id);
    const result = await Transaction.find({});
    const transaction = result.filter((fac) => fac.fac_id == facId);
    const onproduct = transaction.filter((fac) => fac.step == 1);
    console.log(onproduct);
    res.send(onproduct);
});

router.get('/byfac/ontesting/:fac_id', async (req, res) => {
    const facId = Number.parseInt(req.params.fac_id);
    const result = await Transaction.find({});
    const transaction = result.filter((fac) => fac.fac_id == facId);
    const onproduct = transaction.filter((fac) => fac.step == 2);
    console.log(onproduct);
    res.send(onproduct);
});

router.get('/byfac/ontesting_2/:fac_id', async (req, res) => {
    const facId = Number.parseInt(req.params.fac_id);
    const result = await Transaction.find({});
    const transaction = result.filter((fac) => fac.fac_id == facId);
    const onproduct = transaction.filter((fac) => fac.step == 3);
    console.log(onproduct);
    res.send(onproduct);
});

router.get('/byfac/onoffer/:fac_id', async (req, res) => {
    const facId = Number.parseInt(req.params.fac_id);
    const result = await Transaction.find({});
    const transaction = result.filter((fac) => fac.fac_id == facId);
    const onproduct = transaction.filter((fac) => fac.step == 4);
    console.log(onproduct);
    res.send(onproduct);
});


router.post("/", async (req, res) => {
    try {
        const { fac_id, user_id, user_name, step, product, qualityComment_customer, qualityComment_factory, offer_price, testing_price, deliver_price, pakaging_choose, file_pakaging, location_customer, fac_title, status, status_user, count, total_price, total_offer } = req.body;
        const transaction = await Transaction.create({
            fac_id,
            fac_title,
            status,
            status_user,
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
            count,
            total_price,
            total_offer,
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
    console.log(transactionID);
    console.log(value);
    const data = {
        $set: {
            [update]: value,
        }
    }
    const updateDatabase = await Transaction.updateOne({ _id: transactionID }, data);
    res.sendStatus(200, updateDatabase);
});

module.exports = router;
