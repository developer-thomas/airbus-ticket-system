import { City } from "@core/services/noAuth/no-auth.service";

export const sortCities = (x: City, y: City): number => {
  if (x.city < y.city) return -1;
  if (x.city > y.city) return 1;
  return 0;
};
