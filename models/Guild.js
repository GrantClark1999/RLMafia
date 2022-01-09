'use strict';

const { Schema, model } = require('mongoose');

const Guild = new Schema({
    id: String,
    prefix: { 
        type: String, 
        default: 'm!'
    }
});

module.exports = model('Guild', Guild);