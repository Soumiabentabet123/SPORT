import { Router } from "express";
import { find } from "../models/Participant";
const router = Router();


router.get("/:course/:distance", async (req, res) => {
  try {
    const participants = await find({
      Course: req.params.course,
      Distance: req.params.distance,
    });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;