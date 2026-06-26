const MILLISECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000;

export const isOlderThan24Hours = (updatedAt: Date | string): boolean => {
  const date = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  return Date.now() - date.getTime() > MILLISECONDS_IN_24_HOURS;
}