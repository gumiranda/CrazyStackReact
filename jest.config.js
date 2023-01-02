module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  bail: 1,
  moduleNameMapper: {
    "test/(.*)": "<rootDir>/src/test/$1",
    "application/(.*)": "<rootDir>/src/application/$1",
    "widgets/(.*)": "<rootDir>/src/widgets/$1",
    widgets: "<rootDir>/src/widgets",
    "shared/ui": "<rootDir>/src/shared/ui",
    "shared/libs": "<rootDir>/src/shared/libs",
    "shared/api": "<rootDir>/src/shared/api",
    "pages/(.*)": "<rootDir>/src/pages/$1",
  },
};
