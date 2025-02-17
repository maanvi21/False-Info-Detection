require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const AdminSigninSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash passwords before saving
AdminSigninSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const AdminSignin = mongoose.model('admin_signin', AdminSigninSchema);

// Insert four admins
// async function insertAdmins() {
//   try {
//     const admins = [
//       { username: 'admin1', password: 'password123', email: 'admin1@example.com', phone: '1234567890' },
//       { username: 'admin2', password: 'securepass456', email: 'admin2@example.com', phone: '0987654321' },
//       { username: 'admin3', password: 'myadmin789', email: 'admin3@example.com', phone: '1122334455' },
//       { username: 'admin4', password: 'supersecure321', email: 'admin4@example.com', phone: '5566778899' }
//     ];

//     // Hash passwords before inserting
//     for (let admin of admins) {
//       const salt = await bcrypt.genSalt(10);
//       admin.password = await bcrypt.hash(admin.password, salt);
//     }

//     await AdminSignin.insertMany(admins);
//     console.log("✅ Admins inserted successfully!");
//   } catch (error) {
//     console.error("❌ Error inserting admins:", error);
//   } finally {
//     mongoose.connection.close(); // Close DB connection after insertion
//   }
// }



async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB Connected Successfully!");
    //   await insertAdmins();
    } catch (err) {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
    }
  }

module.exports = mongoose;
connectDB();
module.exports = AdminSignin;
