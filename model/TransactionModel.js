const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transaction_id: { type: Number, require: [true, 'A transaction must id'], unique: true },
    fac_id: { type: Number, default: 0 },
    user_id: { type: Number, default: 0 },
    step: { type: Number, require: [true, 'A transaction must id'], default: 0 },
    product: [],
    qualityComment_customer: { type: String, default: "" },
    qualityComment_factory: { type: String, default: "" },
    offer: {
        offer_price: { type: Number, default: 0 },
    },
    testing: {
        testing_price: { type: Number, default: 0 },
        deliver_price: { type: Number, default: 0 },
    },
    pakdaging: {
        pakaging_choose: { type: Number },
        file_pakaging: { type: String, default: "" },

    },
    location_customer: { type: String, default: "" },
});

module.exports = mongoose.model('transaction', TransactionSchema);