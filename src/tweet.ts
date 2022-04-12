
import * as holiday_jp from '@holiday-jp/holiday_jp';
import TwitterApi from 'twitter-api-v2';
const fs = require('fs');

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
        return;
    }
    const userClient = new TwitterApi({
        appKey: appKey,
        appSecret: appSecret,
        accessToken: accessToken,
        accessSecret: accessSecret,
      });

console.log(appKey);

    const json_data = JSON.parse(fs.readFileSync('./data/output.json'));
    const yesterdayData = json_data.data[1];
    const todayData = json_data.data[0];

    const caseDelta = todayData.confirmed_cases - yesterdayData.confirmed_cases;

    const message = `区内の新型コロナウイルス感染症の検査陽性者の状況
陽性者数(累計): ${todayData.confirmed_cases}人 (前日比${caseDelta})
入院中: ${todayData.inpatient_care}人
宿泊療養中: ${todayData.hotel_care}人
自宅療養中: ${todayData.home_care}人
退院等(累計): ${todayData.cured}人
死亡(累計): ${todayData.deaths}人`;
    console.log(message);
    console.log(message.length);
    userClient.v2.tweet(message);
}

main();