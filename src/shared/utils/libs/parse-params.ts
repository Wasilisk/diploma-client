export const parseParams = (params: Record<string, string | null>) => {
  const allFieldsAreNull = Object.values(params).every((field) => field === null);
  if (allFieldsAreNull) {
    return undefined;
  } else {
    return Object.entries(params)
      .filter((property) => property[1] !== null)
      .map(([key, value]) => `${key}:${value}`)
      .join(';');
  }
};
