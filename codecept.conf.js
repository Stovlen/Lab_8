exports.config = {
  tests: "./codecept/*.js",
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "https://automationexercise.com",
      show: false,
      windowSize: "1200x900",
    },
  },
  include: {
    I: "./steps_file.js",
  },
  name: "lab8-ui-tests",
};
