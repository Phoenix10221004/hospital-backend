import { Router } from "express";

const router = Router();

import personRoutes from './routes.js';

router.get('/test', (req, res) => {
  res.send("OK")
})

router.use("/person", personRoutes);

export default router;