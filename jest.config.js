const moduleExport = {
  testEnvironment: "node",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx|js|jsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
    "\\.(png|jpg)$": "<rootDir>/tests/mocks/fileMock.js",
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/tests/setEnvVars.js"],
};

module.exports = async () => {
  // Etc/GMT+3 means UTC - 3 hours
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  process.env.TZ = "Etc/GMT+3";

  return moduleExport;
};
