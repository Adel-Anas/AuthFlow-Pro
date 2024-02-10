/* eslint-disable no-unused-vars */
import Data from "../models/DataSchema.js";

const DataController = {

  getData: async (req, res) => {
    try{
      const fetchedData = await Data.find()
      res.status(200).send(fetchedData)
    }catch(err){
      console.log(`Error getting data ${err}`);
    }
  },
  createData: async (req, res) => {
    try{
      const {name, email, phone, message } = req.body;
      const newData = await Data.create(req.body)
      res.status(201).json(newData)      
    }catch(err){
      console.log(`Error creating data ${err}`);
    }
  },
  updateData: async (req, res) => {
    try{
      const { id } = req.params;
      const updateData = await Data.findById(id, req.body);
      res.status(200).json(updateData);
    }catch(err){
      console.log(`Error updating data ${err}`);
    }
  },
  deleteData: async (req, res) => {
    try{
      const { id } = req.params;
      const deleteData = await Data.findByIdAndDelete(id);
      res.status(200).json(deleteData);
    }catch(err){
      console.log(`Error deleting data ${err}`);
    }
  }
}

export default DataController;