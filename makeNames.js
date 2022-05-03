import { CSV } from "https://js.sabae.cc/CSV.js";

const data = CSV.toJSON(await CSV.fetch("data-latest/event-latest.csv"));
const names = Object.keys(data[0]);
const csv = names.map(n => [n]);
csv.unshift(["name"]);
console.log(csv);
await Deno.writeTextFile("./event-vocabulary.csv", CSV.encode(csv));
