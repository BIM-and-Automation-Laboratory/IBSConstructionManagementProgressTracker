const {model, Schema} = require('mongoose');

const objectSchema = new Schema ({
    weight: Number,
    barcodeID: String,
    registeredOn: Date,
    installedOn: Date
});

module.exports = model('Object', objectSchema);