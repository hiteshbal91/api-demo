const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const Battles = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    battle_number: {
        type: Number,
        required: true
    },
    attacker_king: String,
    defender_king: String,
    attacker_1: String,
    attacker_2: String,
    attacker_3: String,
    attacker_4: String,
    defender_1: String,
    defender_2: String,
    defender_3: String,
    defender_4: String,
    attacker_outcome: {
        type: String,
        enum: ['win', 'loss'],
        required: true
    },
    battle_type: {
        type: String,
        enum: ['pitched battle', 'ambush', 'siege', 'razing'],
        required: true
    },
    major_death: Number,
    major_capture: Number,
    attacker_size: Number,
    defender_size: Number,
    attacker_commander: Number,
    defender_commander: Number,
    summer: {
        type: Number,
        required: true,
        default: 1
    },
    location: String,
    region: String,
    note: String
}, {
    autoIndex: false,
    strict: true,
    collection: "battles"
});

module.exports = exports = {
    Battles,
    BattlesModel: Mongoose.model('Battles', Battles)
};