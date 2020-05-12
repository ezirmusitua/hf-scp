import { snakeCase } from "snake-case";
// TODO: refactor in following format
// // Styles.register(<selector>, <styles>)
// TODO: Support SCSS
// // const ps = Styles.register(<selector>, <styles>)
// // ps.nest(<selector>, <styles>)
// // ...

function objectKeyCamelToSnake(obj) {
  return Object.keys(obj).reduce((res, key) => {
    const newKey = snakeCase(key).replace(/_/g, "-");
    res[newKey] = obj[key];
    return res;
  }, {});
}

export class SCPStyle {
  constructor() {
    this.keys = [];
  }

  toCSS() {
    return this.keys.reduce((css, key) => {
      const rule = this[key];
      if (rule && rule.selector) {
        css += rule.selector + "\n";
        css +=
          JSON.stringify(objectKeyCamelToSnake(rule.style), null, 2)
            .replace(/,/g, ";")
            .replace(/"/g, "") + "\n";
      }
      return css;
    }, "");
  }
}
