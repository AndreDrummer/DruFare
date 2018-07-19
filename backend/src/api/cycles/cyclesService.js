const cycles = require('./cycles');
const errorHandler = require('../common/errorHandler');

cycles.methods(['get', 'post', 'put', 'delete']);
cycles.updateOptions({new: true, runValidators: true});
cycles.after('post', errorHandler).after('put', errorHandler);

cycles.route('count', (req, res, next) => {
  cycles.count((error, value) => {
    if (error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value});
    }
  });
});

module.exports = cycles;
