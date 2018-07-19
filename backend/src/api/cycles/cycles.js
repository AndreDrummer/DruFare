const restful = require('node-restful');
const mongoose = restful.mongoose;
const beauty = require('mongoose-beautiful-unique-validation')

const cyclesSchema = new mongoose.Schema({
  mes: { type: String, required: [true, 'É obrigatório Informar o mês'], unique: true },
  ano: { type: String, min: 19101201, max: 21001201, required: [true, 'É obrigatório Informar o ano'], unique: true }  
});

cyclesSchema.plugin(beauty);
module.exports = restful.model('cycles', cyclesSchema);

// let test = mongoose.model('model',  cyclesSchema);

// let mes1 = new test({
//   mes: 'Agosto',
//   ano: '2020'
// });

// let mes2 = new test({
//   mes: 'Agosto',
//   ano: '2020'
// });

// mes1.save()
//   .then(() => console.log('Salvei o mes de Agosto!'))
//   .catch(err => console.error('admin1 could not be saved: ', err));

// mes2.save()
//   .then(() => console.log('Salvei o mes de Agosto!'))
//   .catch(err => console.error('admin2 could not be saved: ', err));


