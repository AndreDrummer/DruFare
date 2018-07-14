const restful = require('node-restful');
const mongoose = restful.mongoose;


const spentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Number, min: 19101201, max: 21001201, required: [true, 'Data inválida!'] },
  paymentForm: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
});


module.exports = restful.model('spents', spentsSchema);
