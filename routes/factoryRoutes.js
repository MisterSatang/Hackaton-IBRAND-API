const express = require('express');

const router = express.Router();
const Factory = require('../model/FactoryModel');


router.get('/', async (req, res) => {
    const result = await Factory.find({});
    res.send(result);
});

router.get('/province', async (req, res) => {
    const result = await Factory.find({});
    const data = result.map(a => a.province);
    const province = [...new Set(data)];
    res.send(province);
});

router.get('/product', async (req, res) => {
    const result = await Factory.find({});
    const data = result.map(a => a.product_have);
    const product = [...new Set(data.flat())];
    res.send(product);
});

router.get('/catagory', async (req, res) => {
    const result = await Factory.find({});
    const data = result.map(a => a.catagory_english);
    const catagory_english = [...new Set(data)];
    res.send(catagory_english);
});

router.post("/", async (req, res) => {
    try {
        const { fac_id, title, founded, detail, detail_full, location, province, catagory_english, product_have, image, catagory_thai, rate_price, rate_price_FDA, Certificate, p_id, p_image, p_catagory, p_title, p_detail, p_point, p_use, p_ingre, pak_id, pak_image } = req.body;
        const factory = await Factory.create({
            fac_id,
            title,
            founded,
            detail,
            detail_full,
            location,
            province,
            catagory_english,
            product_have,
            image,
            catagory_thai,
            rate_price,
            rate_price_FDA,
            Certificate,
            product: [
                {
                    p_id,
                    p_image,
                    p_catagory,
                    p_title,
                    p_detail,
                    p_point,
                    p_use,
                    p_ingre,
                    p_pakaging: [
                        {
                            pak_id,
                            pak_image
                        }
                    ]
                }
            ],
        })
        res.status(201).json(factory);
    } catch (err) {
        console.log(err);
    }
});


router.get('/search/:id', async (req, res) => {
    const productId = Number.parseInt(req.params.id);
    const result = await Factory.find({});
    const product = result.find((product) => product.fac_id == productId);
    res.json(product);
});

router.get('/filter', async (req, res) => {
    const data = await Factory.find({});
    let find = {};
    const filters = req.query;
    !filters.province ? find = data : (find = data.filter((v) => v.province == filters.province));

    !filters.catagory_english ? find = find : (find = find.filter((v) => v.catagory_english == filters.catagory_english));

    !filters.product_have ? find = find : (find = find.filter((v) => v.product_have.includes(filters.product_have)));


    !filters.p_ingre ? null : (find = find.map(a => a.product.map((item) => {
        if (item.p_ingre.includes(filters.p_ingre)) return a;
    }).filter(v => v != null)).filter(x => x.length != 0));

    let x = [];
    if (!filters.p_ingre) {
        res.json(find);
    } else {
        for (let i = 0; i < find.length; i++) {
            let y = [...new Set(find[i])];
            x.push(y);
        }
        const result = x.flat();
        res.json(result);
    }
});


router.get('/ingre', async (req, res) => {
    const data = await Factory.find({});
    const ingre = data.map(a => a.product.map(b => b.p_ingre));
    let x = [];
    ingre.forEach((data) => {
        data.forEach((data2) => {
            data2.forEach((data3) => {
                x.push(data3.toLocaleLowerCase());
            });
        });
    });
    const y = [...new Set(x)];
    res.json(y);
});

router.get('/watchlist/', async (req, res) => {
    const filters = req.query.search.split(',');
    const result = await Factory.find({});
    const find = result.filter((v) => filters.includes(v.fac_id))
    res.json(find);
});

module.exports = router;