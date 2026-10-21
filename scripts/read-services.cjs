/** Counts the treatments declared in src/data/services.ts, for gate G5. */
const src = require("fs").readFileSync("src/data/services.ts", "utf8");
module.exports = { services: (src.match(/^\s+slug: "/gm) || []).length };
