import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    email: { type: String, unique: true },
    active: { type: Boolean, default: true }
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals (such as the `id` field)
      versionKey: false, // Remove the `__v` field
      transform: (doc, ret) => {
        delete ret._id // Remove _id from the returned object
      }
    },
    toObject: {
      virtuals: true // Include virtuals when converting to a plain object
    }
  }
)

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

const User = mongoose.model('User', schema)

export default User
