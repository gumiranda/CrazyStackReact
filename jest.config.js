module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  bail: 1,
};
