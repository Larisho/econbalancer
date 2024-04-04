import {buildItemGraph, calculatePrices} from "./src/ItemGraph.ts";

const json = {
  "smalllog": {
    "id": "smalllog",
    "name": "Small Log",
    "weight": 5.0,
    "price": 100,
    "craftable": false
  },
  "arrowshaft": {
    "id": "arrowshaft",
    "name": "Arrow Shaft",
    "weight": 0.1,
    "price": undefined,
    "craftable": true,
    "ingredients": ["smalllog"],
    "craftAmount": 10
  },
  "ironore": {
    "id": "ironore",
    "name": "Iron Ore",
    "weight": 10.0,
    "price": 100,
    "craftable": false
  },
  "arrowhead": {
    "id": "arrowhead",
    "name": "Arrow Head",
    "weight": 0.1,
    "price": undefined,
    "craftable": true,
    "ingredients": ["ironore"],
    "craftAmount": 10
  },
  "flightfeather": {
    "id": "flightfeather",
    "name": "Flight Feather",
    "weight": 0.01,
    "price": 20,
    "craftable": false
  },
  "arrow": {
    "id": "arrow",
    "name": "Arrow",
    "weight": 0.1,
    "price": undefined,
    "craftable": true,
    "ingredients": ["arrowhead", "arrowshaft", "flightfeather"],
    "craftAmount": 1
  }
};

const itemGraph = buildItemGraph(json);
console.log(`Priced Items: \n${Object.values(itemGraph).filter(item => item.price !== undefined).map(item => `id: '${item.id}', price: ${item.price}`).join('\n')}`)
console.log(`\nUnpriced Items: \n${Object.values(itemGraph).filter(item => item.price === undefined).map(item => `id: '${item.id}'`).join('\n')}`)
calculatePrices(itemGraph);
console.log('\n')
console.log(Object.values(itemGraph).map(i => `id: ${i.id}, price: ${i.price}`).join('\n'));