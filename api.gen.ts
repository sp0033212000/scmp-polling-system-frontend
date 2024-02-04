//@ts-ignore
const fs = require("fs");
const path = require("path");
const { generateApi } = require("swagger-typescript-api");

(async () => {
  await generateApi({
    name: "swagger.api.ts",
    output: path.resolve(__dirname, "./src/swagger/"),
    url: `${process.env.SCMP_API_URL}/api-json`,
    httpClientType: "axios",
    moduleNameFirstTag: true,
    hooks: {},
  }).then(() => {
    const endpoint = path.resolve(__dirname, "./src/swagger/swagger.api.ts");
    let ts = fs.readFileSync(endpoint, "utf-8");
    ts = `// @ts-nocheck\n${ts}`;
    fs.writeFileSync(endpoint, ts, "utf-8");
  });
})();
