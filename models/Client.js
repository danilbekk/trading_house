const {Schema, model} = require('mongoose')

const Client = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    patronymic: {type: String, required: true},
    status: {type: Schema.Types.ObjectId, ref: "Status"}
})

module.exports = model('Users', Client)