var exp = require('../server')

var User = {
    getUsers : function(callback) {
        return exp.db.query('SELECT * FROM employees', callback);
    }
}

module.exports = User;