module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	setupFiles: ['<rootDir>/tests/setup.ts'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'<rootDir>/tests/**/*.ts',
		'!**/node_modules/**',
	],
	moduleNameMapper: {
		'^@tests/(.*)$': '<rootDir>/tests/$1',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};
