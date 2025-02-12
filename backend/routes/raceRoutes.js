import { Router } from "express";
import { find } from "../models/Race";
const router = Router();


router.get("/:competition/:dateCompet", async (req, res) => {
  try {
    const races = await find({
      Competition: req.params.competition,
      DateCompet: req.params.dateCompet,
    });
    res.json(races);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;