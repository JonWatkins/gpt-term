module.exports = jest.fn().mockImplementation(() => {
  return {
    start: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn(),
  };
});
