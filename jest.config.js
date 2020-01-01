module.exports = {
  // Look only in specific folders
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],

  // Ignore everything except the "imports" folder
  testPathIgnorePatterns: [
    '<rootDir>/.meteor/',
    '<rootDir>/.client/',
    '<rootDir>/node_modules/',
    '<rootDir>/server/',
    '<rootDir>/tests/',
  ],

  // Where to find global mock implementations
  moduleNameMapper: {
    '^meteor/(.*)$': '<rootDir>/__mocks__/meteor/$1.ts',
  },

  collectCoverageFrom: ['imports/**/*.[jt]s?(x)'],
  coverageReporters: ['text', 'lcovonly'],
  coverageDirectory: '.coverage/jest',
}
