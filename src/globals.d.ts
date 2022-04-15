declare namespace NodeJS {
    interface ProcessEnv {
      readonly TWITTER_APP_KEY: string;
      readonly TWITTER_APP_SECRET: string;
      readonly TWITTER_ACCESS_TOKEN: string;
      readonly TWITTER_ACCESS_SECRET: string;
      readonly NOTION_TOKEN: string;
    }
  }
