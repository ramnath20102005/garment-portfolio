const mongoose = require('mongoose');
const Export = require('./models/Export');
const Financial = require('./models/Financial');
require('dotenv').config();

const DB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/garment-portfolio";

const cleanupFutureData = async () => {
    try {
        await mongoose.connect(DB_URI);
        const now = new Date();
        console.log(`Current Date: ${now.toISOString()}`);

        const exportDel = await Export.deleteMany({ createdAt: { $gt: now } });
        const finDel = await Financial.deleteMany({ createdAt: { $gt: now } });

        console.log(`Removed ${exportDel.deletedCount} future Export records.`);
        console.log(`Removed ${finDel.deletedCount} future Financial records.`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

cleanupFutureData();
