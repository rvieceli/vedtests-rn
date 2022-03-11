module.exports = {
  preset: 'react-native',
  rootDir: './src',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.(ts|tsx)',
    '!<rootDir>/components/**/*.styles.(ts|tsx)',
    '<rootDir>/screens/**/*.(ts|tsx)',
    '!<rootDir>/screens/**/*.styles.(ts|tsx)',
  ],
  coverageDirectory: '<rootDir>/../coverage',
};
