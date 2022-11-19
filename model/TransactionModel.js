const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    fac_id: { type: Number, default: 0 },
    user_id: { type: String, default: 0 },
    user_name: { type: String, default: "" },
    step: { type: Number, default: 0 },
    product: [],
    qualityComment_customer: { type: String, default: "" },
    qualityComment_factory: { type: String, default: "" },
    offer_price: { type: Number, default: 0 },
    testing_price: { type: Number, default: 0 },
    pakaging_choose: { type: Number },
    file_pakaging: { type: String, default: "" },
    location_customer: { type: String, default: "" },
});

module.exports = mongoose.model('transaction', TransactionSchema);