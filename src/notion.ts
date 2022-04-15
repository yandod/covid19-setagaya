
import * as holiday_jp from '@holiday-jp/holiday_jp';
const { Client } = require("@notionhq/client")

const fs = require('fs');

const notionToken = process.env.NOTION_TOKEN;

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
    const notion = new Client({
        auth: notionToken,
    })
      
    const json_data = JSON.parse(fs.readFileSync('./data/output.json'));
    const yesterdayData = json_data.data[1];
    const todayData = json_data.data[0];

    const response = await notion.pages.create({
        parent: {
          database_id: "6696a6820a3b415f9ca4a32ee344c804",
        },
        properties: {
          'updated date': {
            title: [
              {
                text: {
                  content: todayData.updated_date,
                },
              },
            ],
          },
        //   date: {
        //     date: todayData.date
        //   },
          'bE%60%7B': {
            type: 'number',
            number: todayData.confirmed_cases,
          },
        //   '入院': {
        //     rich_text: [
        //         {
        //           text: {
        //             content: todayData.confirmed_cases,
        //           },
        //         },
        //       ],
        //   },
        //   '宿泊療養': {
        //     rich_text: [
        //         {
        //           text: {
        //             content: todayData.confirmed_cases,
        //           },
        //         },
        //       ],
        //   },
        //   '自宅療養': {
        //     rich_text: [
        //         {
        //           text: {
        //             content: todayData.confirmed_cases,
        //           },
        //         },
        //       ],
        //   },
        //   '退院等': {
        //     rich_text: [
        //         {
        //           text: {
        //             content: todayData.confirmed_cases,
        //           },
        //         },
        //       ],
        //   },
        //   '死亡者': {
        //     rich_text: [
        //         {
        //           text: {
        //             content: todayData.confirmed_cases,
        //           },
        //         },
        //       ],
        //   },
        }
      });
      console.log(response);
}

main();