import  { Router }  from 'express';
import ctrl from '../controllers/controller.js';
const router = Router();

router.post("/create",ctrl.create);
router.get("/admin", ctrl.findAll);
router.delete("/delete", ctrl.deleteRow);
router.get("/sort", ctrl.sortBy);

export default router;