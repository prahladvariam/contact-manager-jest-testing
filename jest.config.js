// jest.config.js
module.exports = {
    collectCoverage: true,
    // on node 14.x coverage provider v8 offers good speed and more or less good report
    coverageProvider: 'v8',
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!<rootDir>/out/**',
      '!<rootDir>/.next/**',
      '!<rootDir>/*.config.js',
      '!<rootDir>/coverage/**',
    ],
    moduleDirectories: [
      'node_modules',
      // add the directory with the test-utils.js file, for example:
      'utils', // a utility folder
      __dirname, // the root directory
    ],
    // ... other options ...
    moduleNameMapper: {
      // Handle CSS imports (with CSS modules)
      // https://jestjs.io/docs/webpack#mocking-css-modules
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  
      // Handle CSS imports (without CSS modules)
      '^.+\\.(css|sass|scss)$': '<rootDir>/pages/__mocks__/styleMock.js',
  
      // Handle image imports
      // https://jestjs.io/docs/webpack#handling-static-assets
      '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/pages/__mocks__/fileMock.js`,
  
      // Handle module aliases
      '^@/components/(.*)$': '<rootDir>/components/$1',
    },
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/pages/setupTests.js',
      // Use babel-jest to transpile tests with the next/babel preset
      // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
  }
  