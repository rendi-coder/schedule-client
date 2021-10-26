interface IOrigin {
  local: string;
  development: string;
}

export const MODE: keyof IOrigin = (process.env.NODE_ENV || 'local') as keyof IOrigin;

const API_ORIGIN: IOrigin = {
  local: 'http://localhost:5000/api',
  development: 'http://localhost:5000/api',
};

export const global = {
  apiOrigin: API_ORIGIN[MODE],
};

export default global;
