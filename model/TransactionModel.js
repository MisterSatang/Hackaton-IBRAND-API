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
    pakaging_choose: { type: Number, default: 0 },
    file_pakaging: { type: String, default: "" },
    location_customer: { type: String, default: "" },
    fac_title: { type: String, default: "" },
    status: { type: String, default: "" },
    status_user: { type: String, default: "" },
    date: { type: Date, default: new Date() },
    count: { type: Number, default: 0 },
    total_price: { type: Number, default: 0 },
    total_offer: { type: Number, default: 0 },
    deliver_code: { type: String, default: "" },
});

module.exports = mongoose.model('transaction', TransactionSchema);