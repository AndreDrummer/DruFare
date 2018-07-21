const restful = require('node-restful');
const mongoose = restful.mongoose;
const beauty = require('mongoose-beautiful-unique-validation')

const spentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Number, min: 19101201, max: 21001201, required: [true, 'Data inválida!'] },
  paymentForm: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
});

const cyclesSchema = new mongoose.Schema({
  mes: { type: String, required: [true, 'É obrigatório Informar o mês'] },
  ano: { type: String, min: 19101201, max: 21001201, required: [true, 'É obrigatório Informar o ano'] },
  fare: [spentsSchema]
});

cyclesSchema.index({mes: 1, ano: -1});
module.exports = restful.model('cycles', cyclesSchema);

