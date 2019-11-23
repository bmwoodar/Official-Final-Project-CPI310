const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // year:String,
  // major:String,
  skills: [String]
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
