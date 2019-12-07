const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthTokenSchema = new Schema({
  authToken: {
    type: String
  },
  userId: [{type: Schema.Types.ObjectId, ref: 'student'}]
});

const AuthToken = mongoose.model("authToken", AuthTokenSchema);
module.exports = AuthToken;
