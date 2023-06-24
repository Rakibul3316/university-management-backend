import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'student',
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'faculty',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'admin',
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const User = model<IUser, UserModel>('user', userSchema, 'user');
