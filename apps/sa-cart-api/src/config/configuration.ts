export const configuration = {
  ENVIRONMENT: process.env['NODE_ENV'],
  SECRET: process.env['SECRET'],
  DATABASE: process.env['DATABASE'],
  FRONT_END_HOST: process.env['FRONT_END_HOST'],
  PORT: parseInt(process.env['PORT'] || '3000', 10),
};
