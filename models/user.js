var mongoose = require ('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

var User = mongoose.model("User", userSchema);

User.encryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, hash);
            }
        });
    });
}

User.comparePassword = function(password1, password2, callback) {
    bcrypt.compare(password1, password2, function(err, res) {
        if (err || !res) {
            callback({matched: false});
        } else {
            callback({matched: true});
        }
    });
}

module.exports = User;
