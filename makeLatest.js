import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];

const now = new Day();
//const now = new Day("2022-01-01");

//console.log(now.isAfter(new Day("2021-01-02")));
//Deno.exit(0);

let nevent = 0;
const fns = await dir2array("data/");
for (const fn of fns) {
  const data = CSV.toJSON(await CSV.fetch("data/" + fn));
  
  for (const d of data) {
    nevent++;
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
const nday = (d) => {
  const day = d.開始日 || d.終了日;
  if (!day) {
    return 0;
  }
  return new Day(day).getDayOfGregorian();
};
list.sort((a, b) => nday(a) - nday(b));
console.log(list.map(l => l.開始日 + " " + l.終了日 + " " + l.名称));
console.log(list.length + " / " + nevent);
await Deno.writeTextFile("data-latest/event-latest.csv", CSV.stringify(list));
