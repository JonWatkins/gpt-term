let allowedFiles = ["basePath/exists.txt"];
let storedData = [];

module.exports = {
  stat: jest.fn().mockImplementation((path) => {
    return new Promise((resolve, reject) => {
      if (allowedFiles.indexOf(path) !== -1) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }),
  readFile: jest.fn().mockImplementation((path) => {
    return storedData.find((item) => item.path === path)?.content || "";
  }),
  writeFile: jest.fn().mockImplementation((path, content) => {
    allowedFiles.push(path);
    storedData.push({ path, content });
  }),
  unlink: jest.fn().mockImplementation((path) => {
    allowedFiles = allowedFiles.filter((i) => i !== path);
    storedData = storedData.filter((i) => i.path !== path);
  }),
};
