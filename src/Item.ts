export type Item = {
  id: string,
  name?: string,
  weight?: number,
  price?: number,
  craftable: boolean,
  ingredients?: Item[],
  craftAmount?: number
};