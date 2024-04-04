import type {Item} from "./Item.ts";

export type ItemGraph = Record<string, Item>;

export const buildItemGraph = (json: any): ItemGraph => {
  const ret: ItemGraph = {};

  for (let key of Object.keys(json)) {
    const item = json[key]
    if (item.ingredients) item.ingredients = item.ingredients.map((i: string) => json[i] as Item);

    ret[key] = item as Item
  }

  return ret;
};

export const calculatePrices = (itemMap: ItemGraph): void => {
  const process = (item: Item, alreadyVisited: Map<string, number>): number => {
    if (alreadyVisited.has(item.id)) return alreadyVisited.get(item.id) || 0;

    let price = item.price || 0;
    if (!item.price && !item.craftable) {
      console.warn(`Item ${item.id} has no price and is not craftable.`);
      price = 0;
    } else if (item.craftable && item.ingredients) {
      price = item.ingredients
        .map(i => process(i, alreadyVisited) / (item.craftAmount ?? 1))
        .reduce((acc, i) => acc + i, 0);
    }

    item.price = price
    alreadyVisited.set(item.id, price);
    return price;
  }

  const alreadyVisited = new Map<string, number>();
  Object.values(itemMap)
    .forEach(item => process(item, alreadyVisited));
};