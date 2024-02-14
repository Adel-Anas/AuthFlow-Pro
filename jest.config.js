// jest.config.js
export default {
  testEnvironment: 'node', // or 'jsdom' for browser-like environment
  testMatch: ['**/BackEnd/Test/*.test.js'],
  transform: {
    "^.+\\.js$": "babel-jest"
  } // specify test file pattern
};
