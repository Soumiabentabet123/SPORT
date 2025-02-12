import { Schema, model } from "mongoose";

const raceSchema = new Schema({
  Course: { type: String, required: true }, 
  Distance: { type: String, required: true }, 
  HeureDépartCourse: { type: String }, 
  Competition: { type: String, required: true }, 
  "DateCompet.": { type: String, required: true }, 
});

const Race = model("Race", raceSchema);

export default Race;