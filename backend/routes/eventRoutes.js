import { Router } from "express";
import { find, findOne } from "../models/Event";
const router = Router();


router.get("/", async (req, res) => {
  try {
    const events = await find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:competition/:dateCompet", async (req, res) => {
  try {
    const event = await findOne({
      Competition: req.params.competition,
      DateCompet: req.params.dateCompet,
    });
    if (!event) return res.status(404).json({ message: "Événement non trouvé" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;