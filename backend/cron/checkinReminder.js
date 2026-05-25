const cron = require('node-cron');

const Booking = require('../Models/Booking');
const Room = require('../Models/Room');

const sendEmail = require('../Services/emailService');

cron.schedule('0 9 * * *', async () => {

  try {

    console.log('Running check-in reminder cron job...');

    const bookings = await Booking.find({
      bookingStatus: {
        $in: ['confirmed', 'pending']
      }
    });

    const today = new Date();

    for (const booking of bookings) {

      const checkIn = new Date(booking.checkInDate);

      // Difference in days
      const diffTime = checkIn - today;

      const diffDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );

      // 1 day before check-in
      if (diffDays === 1) {

        const room = await Room.findById(booking.roomId);

        await sendEmail({

          to: booking.guestEmail,

          subject: 'Check-In Reminder',

          html: `
          
            <div style="
              font-family: Arial;
              padding: 30px;
              background: #f4f4f4;
            ">

              <div style="
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 30px;
                border-radius: 10px;
              ">

                <h2 style="color:#4f46e5;">
                  Your Check-In is Tomorrow
                </h2>

                <p>Hello ${booking.guestName},</p>

                <p>
                  This is a reminder that your hotel check-in is tomorrow.
                </p>

                <table width="100%" cellpadding="10">

                  <tr>
                    <td><strong>Room Number</strong></td>
                    <td>${room.roomNumber}</td>
                  </tr>

                  <tr>
                    <td><strong>Check-In Date</strong></td>
                    <td>${booking.checkInDate}</td>
                  </tr>

                  <tr>
                    <td><strong>Check-Out Date</strong></td>
                    <td>${booking.checkOutDate}</td>
                  </tr>

                </table>

                <p style="margin-top:20px;">
                  We look forward to welcoming you.
                </p>

              </div>

            </div>
          `,
        });

        console.log(
          `Check-in reminder sent to ${booking.guestEmail}`
        );
      }
    }

  } catch (error) {
    console.log(error);
  }
});