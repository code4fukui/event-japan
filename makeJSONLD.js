import { CSV } from "https://js.sabae.cc/CSV.js";

class JSONLD {
  static make(vocab, data) {
    const context = (() => {
      if (vocab.url) {
        const context = {};
        context[vocab.prefix] = vocab.url;
        return context;
      } else {
        return vocab;
      }
    })();
    const prefix = vocab.prefix ? vocab.prefix + ":" : "";

    const list = [];
    for (const d of data) {
      const ld = { "@context": context };
      for (const name in d) {
        if (d[name] !== "") {
          ld[prefix + name] = d[name];
        }
      }
      list.push(ld);
    }
    return list;
  }
}

const data = CSV.toJSON(await CSV.fetch("data-latest/event-latest.csv"));

//const vocab = { prefix: "brevent", url: "https://registry-catalog.registries.digital.go.jp/dataset/?groups=g1-000304#" };
const vocab = "event-schema.jsonld";
const jsonld = JSONLD.make(vocab, data);
console.log(jsonld);

await Deno.writeTextFile("./data-latest/event-latest.jsonld", JSON.stringify(jsonld, null, 2));
