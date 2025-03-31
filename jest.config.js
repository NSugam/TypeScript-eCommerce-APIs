module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true
    }
  }
};
