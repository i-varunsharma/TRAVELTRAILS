import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  // Who booked it. Stored directly on the booking (instead of just a
  // reference to User) so the admin view can show it without an extra
  // database lookup.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },

  // What they booked
  stateName: { type: String, required: true },
  trekName: { type: String, required: true },

  // Details from the booking form
  date: { type: String, required: true },
  people: { type: Number, required: true, min: 1 },
  contactName: { type: String, required: true },
  whatsapp: { type: String, required: true }
}, {
  timestamps: true
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export default Booking;
