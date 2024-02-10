import mongoose from 'mongoose'

const permissionSchema = mongoose.Schema({
  name : {
    type: String,
    required: true,
    unique: true,
  }
})

const Permissions = mongoose.model("Permissions", permissionSchema)

export default Permissions;