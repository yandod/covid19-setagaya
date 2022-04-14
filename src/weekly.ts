
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

    if (today.getDay() !== 2) {
        console.log('Today is not Tuesday');
        //return;
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

    const maleDelta = todayData.confirmed_cases_male - yesterdayData.confirmed_cases_male;
    const femaleDelta = todayData.confirmed_cases_female - yesterdayData.confirmed_cases_female;
    const age09Delta = todayData.confirmed_cases_age_0_9 - yesterdayData.confirmed_cases_age_0_9;
    const age1019Delta = todayData.confirmed_cases_age_10_19 - yesterdayData.confirmed_cases_age_10_19;
    const age2029Delta = todayData.confirmed_cases_age_20_29 - yesterdayData.confirmed_cases_age_20_29;
    const age3039Delta = todayData.confirmed_cases_age_30_39 - yesterdayData.confirmed_cases_age_30_39;
    const age4049Delta = todayData.confirmed_cases_age_40_49 - yesterdayData.confirmed_cases_age_40_49;
    const age5059Delta = todayData.confirmed_cases_age_50_59 - yesterdayData.confirmed_cases_age_50_59;
    const age6069Delta = todayData.confirmed_cases_age_60_69 - yesterdayData.confirmed_cases_age_60_69;
    const age7079Delta = todayData.confirmed_cases_age_70_79 - yesterdayData.confirmed_cases_age_70_79;
    const age8089Delta = todayData.confirmed_cases_age_80_89 - yesterdayData.confirmed_cases_age_80_89;
    const age9099Delta = todayData.confirmed_cases_age_90_99 - yesterdayData.confirmed_cases_age_90_99;
    const age100109Delta = todayData.confirmed_cases_age_100_109 - yesterdayData.confirmed_cases_age_100_109;
    const ageUnknownDelta = todayData.confirmed_cases_age_unknown - yesterdayData.confirmed_cases_age_unknown;

    const message = `${todayData.updated_date}
区内の検査陽性者の状況
男女別人数
男: ${caseFormat.format(todayData.confirmed_cases_male)}人 (${deltaFormat.format(maleDelta)})
女: ${caseFormat.format(todayData.confirmed_cases_female)}人 (${deltaFormat.format(femaleDelta)})
(1/3)`;

    const message2nd = `年代別人数
0~9: ${caseFormat.format(todayData.confirmed_cases_age_0_9)}人 (${deltaFormat.format(age09Delta)})
10~19: ${caseFormat.format(todayData.confirmed_cases_age_10_19)}人 (${deltaFormat.format(age1019Delta)})
20~29: ${caseFormat.format(todayData.confirmed_cases_age_20_29)}人 (${deltaFormat.format(age2029Delta)})
30~39: ${caseFormat.format(todayData.confirmed_cases_age_30_39)}人 (${deltaFormat.format(age3039Delta)})
40~49: ${caseFormat.format(todayData.confirmed_cases_age_40_49)}人 (${deltaFormat.format(age4049Delta)})
50~59: ${caseFormat.format(todayData.confirmed_cases_age_50_59)}人 (${deltaFormat.format(age5059Delta)})
(2/3)`;

    const message3rd = `年代別人数
60~69: ${caseFormat.format(todayData.confirmed_cases_age_60_69)}人 (${deltaFormat.format(age6069Delta)})
70~79: ${caseFormat.format(todayData.confirmed_cases_age_70_79)}人 (${deltaFormat.format(age7079Delta)})
80~89: ${caseFormat.format(todayData.confirmed_cases_age_80_89)}人 (${deltaFormat.format(age8089Delta)})
90~99: ${caseFormat.format(todayData.confirmed_cases_age_90_99)}人 (${deltaFormat.format(age9099Delta)})
100~109: ${caseFormat.format(todayData.confirmed_cases_age_100_109)}人 (${deltaFormat.format(age100109Delta)})
不明: ${caseFormat.format(todayData.confirmed_cases_age_unknown)}人 (${deltaFormat.format(ageUnknownDelta)})

https://bit.ly/covid19setagaya
(3/3)`;

//     const message = `${todayData.updated_date}
// 区内の検査陽性者の状況
// 男女別人数
// 男: ${caseFormat.format(todayData.confirmed_cases_male)}人 (${deltaFormat.format(maleDelta)})
// 女: ${caseFormat.format(todayData.confirmed_cases_female)}人 (${deltaFormat.format(femaleDelta)})
// 年代別人数
// 0~9: ${caseFormat.format(todayData.confirmed_cases_age_0_9)}人 (${deltaFormat.format(age09Delta)})
// 10~19: ${caseFormat.format(todayData.confirmed_cases_age_10_19)}人 (${deltaFormat.format(age1019Delta)})
// 20~29: ${caseFormat.format(todayData.confirmed_cases_age_20_29)}人 (${deltaFormat.format(age2029Delta)})
// 30~39: ${caseFormat.format(todayData.confirmed_cases_age_30_39)}人 (${deltaFormat.format(age3039Delta)})
// 40~49: ${caseFormat.format(todayData.confirmed_cases_age_40_49)}人 (${deltaFormat.format(age4049Delta)})
// 50~59: ${caseFormat.format(todayData.confirmed_cases_age_50_59)}人 (${deltaFormat.format(age5059Delta)})
// 60~69: ${caseFormat.format(todayData.confirmed_cases_age_60_69)}人 (${deltaFormat.format(age6069Delta)})
// 70~79: ${caseFormat.format(todayData.confirmed_cases_age_70_79)}人 (${deltaFormat.format(age7079Delta)})
// 80~89: ${caseFormat.format(todayData.confirmed_cases_age_80_89)}人 (${deltaFormat.format(age8089Delta)})
// 90~99: ${caseFormat.format(todayData.confirmed_cases_age_90_99)}人 (${deltaFormat.format(age9099Delta)})
// 100~109: ${caseFormat.format(todayData.confirmed_cases_age_100_109)}人 (${deltaFormat.format(age100109Delta)})
// 不明: ${caseFormat.format(todayData.confirmed_cases_age_unknown)}人 (${deltaFormat.format(ageUnknownDelta)})
// https://bit.ly/covid19setagaya`;

    console.log(message);
    console.log(message2nd);
    console.log(message3rd);
    
    console.log(message.length);
    console.log(message2nd.length);
    console.log(message3rd.length);
    
    //userClient.v2.tweetThread([message,message2nd,message3rd]);

}

main();