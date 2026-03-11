const mongoose = require('mongoose');
const { extractMLDatasets } = require('./services/ml/dataExtractionService');
require('dotenv').config();

const DB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/garment-portfolio";

const sync = async () => {
    try {
        await mongoose.connect(DB_URI);
        await extractMLDatasets();
        await mongoose.connection.close();
        console.log('SYNC_COMPLETE');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

sync();
