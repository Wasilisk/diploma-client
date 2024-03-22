export const parseParams = (params?: Record<string, string | number | null | undefined>) => {
  if(!params) return undefined
  const allFieldsAreNull = Object.values(params).every((field) => field === null);
  if (allFieldsAreNull) {
    return undefined;
  } else {
    return Object.entries(params)
      .filter((property) => !!property[1])
      .map(([key, value]) => `${key}=${value}`)
      .join(';');
  }
};
