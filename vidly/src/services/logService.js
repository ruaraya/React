import * as Sentry from "@sentry/browser";

function init() {
  /*
  Sentry.init({
    dsn: "https://5779b21c745e4b7fb9c3403f5a326009@sentry.io/1450007"
  });
  */
}

function log(error) {
  console.log(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log
};
