import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String,
})

const Data = mongoose.model('Data', dataSchema)

export default Data;