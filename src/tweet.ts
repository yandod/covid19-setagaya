
import * as holiday_jp from '@holiday-jp/holiday_jp';
import TwitterApi from 'twitter-api-v2';
const fs = require('fs');

const appKey = process.env.TWITTER_APP_KEY;
const appSecret = process.env.TWITTER_APP_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_SECRET;

const main = async () => {

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

    const json_data = JSON.parse(fs.readFileSync('./data/output.json'));
    const yesterdayData = json_data.data[1];
    const todayData = json_data.data[0];

    const deltaFormat = new Intl.NumberFormat("en-US", {
        signDisplay: "exceptZero"
    });

    const caseFormat =  new Intl.NumberFormat("en-US");

    const caseDelta = todayData.confirmed_cases - yesterdayData.confirmed_cases;
    const inpatientDelta = todayData.inpatient_care - yesterdayData.inpatient_care;
    const hotelDelta = todayData.hotel_care - yesterdayData.hotel_care;
    const homeDelta = todayData.home_care - yesterdayData.home_care;
    const curedDelta = todayData.cured - yesterdayData.cured;
    const deathDelta = todayData.deaths - yesterdayData.deaths;

    const message = `${todayData.updated_date}
区内の検査陽性者の状況
累計陽性者数: ${caseFormat.format(todayData.confirmed_cases)}人 (${deltaFormat.format(caseDelta)})
🏥: ${caseFormat.format(todayData.inpatient_care)}人 (${deltaFormat.format(inpatientDelta)})
🏨: ${caseFormat.format(todayData.hotel_care)}人 (${deltaFormat.format(hotelDelta)})
🏠: ${caseFormat.format(todayData.home_care)}人 (${deltaFormat.format(homeDelta)})
🎉: ${caseFormat.format(todayData.cured)}人 (${deltaFormat.format(curedDelta)})
累計死亡者: ${caseFormat.format(todayData.deaths)}人 (${deltaFormat.format(deathDelta)})

https://bit.ly/covid19setagaya`;

    console.log(message);
    console.log(message.length);
    const mediaId = await userClient.v1.uploadMedia('./data/fig1.png');
    userClient.v1.tweet(message, { media_ids: mediaId});
}

main();