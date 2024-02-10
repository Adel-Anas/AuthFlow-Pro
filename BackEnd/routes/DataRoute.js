  import express from 'express';
  import DataController from '../controllers/DataController.js';
  import checkPermission from '../middlewares/CheckPermission.js';

  const dataRouter = express.Router();

  dataRouter.get('/getData', checkPermission, DataController.getData)
  dataRouter.post('/postData',checkPermission, DataController.createData)
  dataRouter.put('/updateData',checkPermission, DataController.updateData)
  dataRouter.delete('/deleteData',checkPermission, DataController.deleteData)

  export default dataRouter;