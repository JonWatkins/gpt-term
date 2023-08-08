module.exports = {
  createLogger: jest.fn().mockImplementation(() => {
    return {
      error: jest.fn(),
    };
  }),
  format: {
    json: jest.fn(),
  },
  transports: {
    File: jest.fn(),
  },
};
