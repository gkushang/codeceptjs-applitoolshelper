const {
  Eyes: wdioEyes,
  Target: wdioTarget,
} = require("@applitools/eyes-webdriverio");
const { Eyes: pwEyes } = require("@applitools/eyes-playwright");

class ApplitoolsHelper extends Helper {
  constructor(config) {
    super(config);
    this.config = config;
  }

  async _before() {
    if (this.helpers.WebDriver) {
      this.eyes = new wdioEyes(this.config.serverUrl || "");
      const { browser } = this.helpers.WebDriver;
      this.client = browser;
    } else {
      this.eyes = new pwEyes(this.config.serverUrl || "");
      const { page } = this.helpers.Playwright;
      this.client = page;
    }
  }

  /**
   * @param pageName {String} name of the page you want to check
   * @param uniqueId {String} provide a unique id to combine tests into a batch
   * @param matchLevel {String} set the match level. Possible values: Extract, Strict, Content, Layout
   *
   */
  async eyeCheck(pageName, uniqueId, matchLevel) {
    this.eyes.setForceFullPageScreenshot(true);

    if (uniqueId) {
      this.eyes.setBatch(pageName, uniqueId);
    }

    if (matchLevel) {
      this.eyes.setMatchLevel(matchLevel);
    }

    await this.eyes.open(this.client, appName, pageName, windowsSize);
    await this.eyes.check(pageName, wdioTarget.window().fully());
    await this.eyes.close();
  }
}

module.exports = ApplitoolsHelper;
