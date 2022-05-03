import { CSV } from "https://js.sabae.cc/CSV.js";

class JSONLD {
  static make(vocab, data) {
    const list = [];
    for (const d of data) {
      const context = {};
      context[vocab.prefix] = vocab.url;
      const ld = { "@context": context };
      for (const name in d) {
        if (d[name] !== "") {
          ld[vocab.prefix + ":" + name] = d[name];
        }
      }
      list.push(ld);
    }
    return list;
  }
}

const data = CSV.toJSON(await CSV.fetch("data-latest/event-latest.csv"));

const vocab = { prefix: "brevent", url: "https://registry-catalog.registries.digital.go.jp/dataset/?groups=g1-000304#" };
const jsonld = JSONLD.make(vocab, data);
console.log(jsonld);

await Deno.writeTextFile("./data-latest/event-latest.jsonld", JSON.stringify(jsonld, null, 2));
