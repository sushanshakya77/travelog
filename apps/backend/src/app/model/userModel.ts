import * as mongoose from 'mongoose';

export enum Roles {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  currentCity: string;
  description: string;
  profilePicture: any;
  dob: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  phoneNumber: String,
  email: String,
  role: { type: String, enum: [Roles.ADMIN, Roles.USER], default: Roles.USER },
  profilePicture: {
    type: String,
  },
  coverPicture: {
    data: Buffer,
    contentType: String,
  },

  currentCity: String,
  description: String,
  dob: String,
  password: { type: String, required: true },
});

usersSchema.set('timestamps', {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

const User = mongoose.model('User', usersSchema);

export default User;
