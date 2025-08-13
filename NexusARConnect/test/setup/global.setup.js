// Global setup for Playwright tests
module.exports = async () => {
  // You can set environment variables or perform async init here
  process.env.NODE_ENV = 'test';
  console.log('[Playwright] Global setup complete');
};
