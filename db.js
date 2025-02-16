const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://kyleidea:asdfjkl64@kyle.pfmyc.mongodb.net/?retryWrites=true&w=majority&appName=Kyle'; // MongoDB URL
const client = new MongoClient(url);

let db;

async function connectDb() {
    try {
        await client.connect();
        console.log('✅ DB 연결 성공');
        db = client.db('Sadajo');
    } catch (err) {
        console.error('❌ DB 연결 실패:', err);
    }
}

function getDb() {
    if (!db) {
        throw new Error('❌ DB가 아직 연결되지 않았습니다!');
    }
    return db;
}

module.exports = { connectDb, getDb };