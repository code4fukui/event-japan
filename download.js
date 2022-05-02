import { CKAN } from "../address-japan/CKAN.js";
import { makeDirs } from "../address-japan/makeDirs.js";

const list = await CKAN.listDatasetByGroup("g1-000304");
//console.log(list);
for (const d of list.result) {
  const data = await CKAN.showDataset(d.id);
  console.log(data);
  const url = await CKAN.parseResourceURL(data.result);
  console.log(url);
  const fn = data.result.name + ".csv";
  const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
  await Deno.writeFile(makeDirs("data/" +  fn), bin);
}
