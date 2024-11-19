import React from 'react';

// Function to format notifications
export const formatNotification = (notification) => {
  return `${notification.date}: ${notification.message}`;
};

// Notifications component
const Notifications = () => {
  // Component logic...
  return <div>Notifications</div>;
};

export default Notifications;

// Test for the formatNotification function
if (process.env.NODE_ENV === 'test') {
  describe('formatNotification function', () => {
    it('should format the notification correctly', () => {
      const notification = { date: '2024-10-31', message: 'Test Notification' };
      const result = formatNotification(notification);

      // Assertion to check the formatted output
      expect(result).toBe('2024-10-31: Test Notification');
    });
  });
}
