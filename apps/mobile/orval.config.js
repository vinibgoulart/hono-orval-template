module.exports = {
  'crypto-alert': {
    input: {
      target: `${process.env.API_URL}/doc`,
    },
    output: {
      mode: 'tags-split',
      target: './src/schema/schema.ts',
      schemas: './src/schema/model',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: process.env.API_URL,
      override: {
        mutator: {
          path: './src/lib/fetcher.ts',
          name: 'fetcher',
        },
      },
    },
  },
  'crypto-alert-zod': {
    input: {
      target: `${process.env.API_URL}/doc`,
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/schema',
      fileExtension: '.zod.ts',
      baseUrl: process.env.API_URL,
    },
  }
};