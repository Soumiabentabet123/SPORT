import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hajarnajam:hajarhajar123@sitesportif.fpfdh.mongodb.net/SiteSportif?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully ✅');
  } catch (err) {
    console.error('MongoDB connection error ❌:', err.message);
    process.exit(1);
  }
};

export default connectDB;