import * as mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: { type: String, required: true },
    phoneNumber: String,
    email: String,
    profilePicture: String,
    // {
    //   data: Buffer,
    //   contentType: String,
    // },
    currentCity: String,
    description: String,
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', usersSchema);

export default User;
