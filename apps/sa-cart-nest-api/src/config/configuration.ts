export const configuration = () => ({
  environment: process.env['NODE_ENV'],
  port: parseInt(process.env['PORT'] || '3000', 10),
  serverURI : process.env['SERVER_URI']
});
