jest.spyOn(Date.prototype, "getDate").mockReturnValue(26);
jest.spyOn(Date.prototype, "getMonth").mockReturnValue(10);
jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2023);
jest.spyOn(process.stdout, "write");
