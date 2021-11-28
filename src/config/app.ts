interface IOrigin {
  local: string;
  development: string;
}

export const MODE: keyof IOrigin = (process.env.NODE_ENV || 'local') as keyof IOrigin;

const IPv4 = '37.140.241.243';

const API_ORIGIN: IOrigin = {
  local: `http://${IPv4}:5000/api`,
  development: `http://${IPv4}:5000/api`,
};

export const global = {
  apiOrigin: API_ORIGIN[MODE],
};

export default global;
