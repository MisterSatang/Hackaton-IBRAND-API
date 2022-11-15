const mongoose = require('mongoose');

const FactorySchema = new mongoose.Schema({
    fac_id: { type: String },
    title: {
        type: String,
    },
    founded: {
        type: String,
    },
    detail: {
        type: String,
    },
    detail_full: {
        type: String,
    },
    location: {
        type: String,
    },
    province: {
        type: String,
    },
    catagory_english: {
        type: String,
    },
    product_have: [],
    image: [],
    catagory_thai: {
        type: String,
    },
    rate_price: {
        type: String,
    },
    rate_price_FDA: {
        type: String,
    },
    Certificate: [],
    product: [
        {
            p_id: { type: Number },
            p_image: { type: String },
            p_catagory: { type: String },
            p_title: { type: String },
            p_detail: { type: String },
            p_point: [],
            p_use: { type: String },
            p_ingre: [],
            p_pakaging: [
                {
                    pak_id: { type: String },
                    pak_image: { type: String }
                }
            ]
        }
    ],
})

module.exports = mongoose.model("factory", FactorySchema);