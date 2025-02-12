import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  Competition: { type: String, required: true, unique: true }, 
  "DateCompet.": { type: String, required: true }, 
  "Ville Compet.": { type: String }, 
  Description: { type: String },
});

const Event = model("Event", eventSchema);

export default Event;