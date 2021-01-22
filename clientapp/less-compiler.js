const fs = require("fs");
const cleanCss = require("less-plugin-clean-css");
const less = require("less");
const darkTheme = require("ng-zorro-antd/dark-theme");
const defaultTheme = `@import "./node_modules/ng-zorro-antd/ng-zorro-antd.less";`;

less
  .render(defaultTheme, {
    javascriptEnabled: true,
    plugins: [new cleanCss({ advanced: true })],
    modifyVars: {
      ...darkTheme,
      ...{
        "body-background": "#141414",
        "primary-color": "#253fba",
      },
    },
  })
  .then((value) => {
    fs.writeFileSync("./src/assets/themes/dark.css", value.css);
  })
  .catch((e) => console.error(e));
