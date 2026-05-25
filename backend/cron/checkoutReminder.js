const cron = require('node-cron');

const Booking = require('../Models/Booking');
const Room = require('../Models/Room');

const sendEmail = require('../Services/emailService');

const {
  checkoutReminderTemplate,
} = require('../utils/emailTemplates');

cron.schedule('0 8 * * *', async () => {

  try {

    console.log('Running checkout reminder cron job...');

    const today = new Date();

    const bookings = await Booking.find({
      bookingStatus: {
        $in: ['confirmed', 'checked_in']
      }
    });

    for (const booking of bookings) {

      const checkout = new Date(booking.checkOutDate);

      if (
        checkout.getDate() === today.getDate() &&
        checkout.getMonth() === today.getMonth() &&
        checkout.getFullYear() === today.getFullYear()
      ) {

        const room = await Room.findById(booking.roomId);

        await sendEmail({
          to: booking.guestEmail,

          subject: 'Checkout Reminder',

          html: checkoutReminderTemplate({
            name: booking.guestName,
            roomNo: room.roomNumber,
            checkOutDate: booking.checkOutDate,
          }),
        });

        console.log(`Reminder sent to ${booking.guestEmail}`);
      }
    }

  } catch (error) {
    console.log(error);
  }
});