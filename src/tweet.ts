
import * as holiday_jp from '@holiday-jp/holiday_jp';
import TwitterApi from 'twitter-api-v2';

const appKey = process.env.TWITTER_APP_KEY;
const appSecret = process.env.TWITTER_APP_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_SECRET;

const main = () => {

    const today = new Date();
    if (holiday_jp.isHoliday(today)) {
        console.log('Today is Holiday');
        return;
    }

    if (today.getDay() == 0 || today.getDay() == 6) {
        console.log('Today is weekend');
        //return;
    }
    console.log(appKey);
    const userClient = new TwitterApi({
        appKey: appKey,
        appSecret: appSecret,
        accessToken: accessToken,
        accessSecret: accessSecret,
      });

    userClient.v2.tweet('Test');
}

main();