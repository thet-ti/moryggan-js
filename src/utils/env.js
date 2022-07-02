export const getEnv = (key) => (process.env[key]);

export const env = {
  NODE_PORT: getEnv('NODE_PORT') || 8080,
  NODE_ENV: getEnv('NODE_ENV') || 'development',
};
