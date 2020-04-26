import mongoose, { Schema, mongo } from "mongoose";

const incomeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: true,
  },
  proof_type: {
    type: String,
    maxlength: 20,
    required: true,
  },
  proof_serie: {
    type: String,
    maxlength: 7,
  },
  proof_num: {
    type: String,
    maxlength: 10,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  details: [
    {
      _id: {
        type: String,
        required: true,
      },
      item: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  state: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Income = mongoose.model("income", incomeSchema);

export default Income;
