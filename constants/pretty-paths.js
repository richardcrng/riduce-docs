const yaml = require("js-yaml");
const fs = require("fs");

const PRETTY_PATHS = yaml.load(fs.readFileSync("./pretty-paths.yaml", "utf8"));

module.exports = PRETTY_PATHS;
