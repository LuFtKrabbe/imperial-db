export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFiles: ["./jest.pollyfills.ts"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
