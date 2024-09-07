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
		'^@core/(.*)$': '<rootDir>/src/core/$1',
		'^@auth/(.*)$': '<rootDir>/src/auth/$1',
		'^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@database/(.*)$': '<rootDir>/src/database/$1',
		'^@app': '<rootDir>/src/app',
		'^@config': '<rootDir>/src/config',
	},
};
