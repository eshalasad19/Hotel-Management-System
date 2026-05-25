const bookingConfirmationTemplate = (booking) => {
    return `
      <h2>Booking Confirmed</h2>
  
      <p>Dear ${booking.name},</p>
  
      <p>Your booking has been confirmed successfully.</p>
  
      <h3>Booking Details</h3>
  
      <ul>
        <li><strong>Room Number:</strong> ${booking.roomNo}</li>
        <li><strong>Check-In:</strong> ${booking.checkInDate}</li>
        <li><strong>Check-Out:</strong> ${booking.checkOutDate}</li>
        <li><strong>Total Price:</strong> Rs. ${booking.totalPrice}</li>
      </ul>
  
      <p>Thank you for choosing our hotel.</p>
    `;
  };
  
  
  const cancellationTemplate = (booking) => {
    return `
      <h2>Booking Cancelled</h2>
  
      <p>Hello ${booking.name},</p>
  
      <p>Your booking has been cancelled successfully.</p>
  
      <ul>
        <li><strong>Room Number:</strong> ${booking.roomNo}</li>
        <li><strong>Check-In:</strong> ${booking.checkInDate}</li>
        <li><strong>Check-Out:</strong> ${booking.checkOutDate}</li>
      </ul>
  
      <p>If this was a mistake, contact support.</p>
    `;
  };
  
  
  const checkoutReminderTemplate = (booking) => {
    return `
      <h2>Checkout Reminder</h2>
  
      <p>Hello ${booking.name},</p>
  
      <p>This is a reminder that today is your checkout day.</p>
  
      <ul>
        <li><strong>Room Number:</strong> ${booking.roomNo}</li>
        <li><strong>Checkout Date:</strong> ${booking.checkOutDate}</li>
      </ul>
  
      <p>We hope you enjoyed your stay.</p>
    `;
  };
  
  
  module.exports = {
    bookingConfirmationTemplate,
    cancellationTemplate,
    checkoutReminderTemplate,
  };