const spents = require('./spents');
const errorHandler = require('../common/errorHandler');

spents.methods(['get', 'post', 'put', 'delete']);
spents.updateOptions({new: true, runValidators: true});
spents.after('post', errorHandler).after('put', errorHandler);

spents.route('count', (req, res, next) => {
  spents.count((error, value) => {
    if (error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value});
    }
  });
});

module.exports = spents;
