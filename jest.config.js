const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  // preset: 'react-native',
  preset: '@testing-library/react-native',
  rootDir: './src',
  setupFiles: [...jestPreset.setupFiles],
  setupFilesAfterEnv: ['../jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-safe-area-context)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.(ts|tsx)',
    '<rootDir>/screens/**/*.(ts|tsx)',
    '<rootDir>/hooks/**/*.(ts|tsx)',
    '<rootDir>/store/**/*.(ts|tsx)',
    '!<rootDir>/**/*.styles.(ts|tsx)',
    '!<rootDir>/**/*.types.ts',
  ],
  coverageDirectory: '<rootDir>/../coverage',
};
