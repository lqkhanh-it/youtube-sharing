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
		'^@core/(.*)$': '<rootDir>/core/$1',
		'^@auth/(.*)$': '<rootDir>/auth/$1',
		'^@helpers/(.*)$': '<rootDir>/helpers/$1',
		'^@routes/(.*)$': '<rootDir>/routes/$1',
		'^@database/(.*)$': '<rootDir>/database/$1',
		'^@app': '<rootDir>/app',
		'^@config': '<rootDir>/config',
	},
};
