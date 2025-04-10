import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:4000',
	documents: ['src/**/*.ts', 'src/**/*.graphql'],
	generates: {
		'./src/lib/graphql/types.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: {
				clientPath: '$lib/graphql/apollo-client'
			}
		}
	}
};
export default config;
