module.exports = {
  testMatch: [
    "<rootDir>/**/__tests__/**/?(*.)(spec|test).ts",
    "<rootDir>/**/?(*.)(spec|test).ts",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
};
