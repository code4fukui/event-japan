import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];

const now = new Day();
//const now = new Day("2022-01-01");

//console.log(now.isAfter(new Day("2021-01-02")));
//Deno.exit(0);

const fns = await dir2array("data/");
for (const fn of fns) {
  const data = CSV.toJSON(await CSV.fetch("data/" + fn));
  
  for (const d of data) {
    //console.log(d);
    const dayend = d.終了日;
    const daystart = d.開始日;
    if (dayend) {
      if (!now.isAfter(new Day(dayend))) {
        list.push(d);
      }
    } else if (daystart) {
      if (!now.isAfter(new Day(daystart))) {
        list.push(d);
      }
    }
  }
}
console.log(list.map(l => l.開始日 + " " + l.終了日 + " " + l.名称));
await Deno.writeTextFile("data/event-latest.csv", CSV.stringify(list));

