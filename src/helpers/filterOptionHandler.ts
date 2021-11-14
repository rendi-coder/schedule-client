// eslint-disable-next-line
export const filterOptionHandler = (input: any, option: any): boolean =>
  Object.keys(option || {}).some(
    (key: string) => option?.[key]?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
  );
