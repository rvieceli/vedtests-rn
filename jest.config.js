const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  preset: 'react-native',
  rootDir: './src',
  setupFiles: [...jestPreset.setupFiles],
  setupFilesAfterEnv: ['../jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-safe-area-context)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.(ts|tsx)',
    '!<rootDir>/components/**/*.styles.(ts|tsx)',
    '<rootDir>/screens/**/*.(ts|tsx)',
    '!<rootDir>/screens/**/*.styles.(ts|tsx)',
    '<rootDir>/hooks/**/*.(ts|tsx)',
  ],
  coverageDirectory: '<rootDir>/../coverage',
};
