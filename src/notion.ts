
const { Client } = require("@notionhq/client")
const { program } = require('commander');
const fs = require('fs');
const notionToken = process.env.NOTION_TOKEN;

const main = async () => {
    program.option('--all');
    program.parse();

    const notion = new Client({
        auth: notionToken,
    })
      
    const json_data = JSON.parse(fs.readFileSync('./data/output.json'));

    let target = 1;
    if (program.opts().all == 1) {
      target = json_data.data.length;
    }

    for (let i = 0; i < target; i++) {
      const todayData = json_data.data[i];
      if (todayData.updated_date == undefined) {
        todayData.updated_date = todayData.date;
      }
      createPage(notion, todayData);
    }
    
}

const createPage = async (notion:any , record:any ) => {
  const response = await notion.pages.create({
    parent: {
      database_id: "6696a6820a3b415f9ca4a32ee344c804",
    },
    properties: {
      'updated date': {
        title: [
          {
            text: {
              content: record.updated_date,
            },
          },
        ],
      },
      '%3D%5DcQ': {
        date: {
          start: record.date,
          end: null
        }
      },
      'bE%60%7B': {
        type: 'number',
        number: Number(record.confirmed_cases),
      },
      'u%7DPu': {
        type: 'number',
        number: Number(record.inpatient_care),
      },
      '%7BEbE': {
        type: 'number',
        number: Number(record.hotel_care),
      },
      'R%5Bd%3E': {
        type: 'number',
        number: Number(record.home_care),
      },
      '_OBe': {
        type: 'number',
        number: Number(record.cured),
      },
      'fd%3F%5B': {
        type: 'number',
        number: Number(record.deaths),
      },
      '%3BE%60G': {
        type: 'number',
        number: Number(record.confirmed_cases_male),
      },
      'mD%5Dq': {
        type: 'number',
        number: Number(record.confirmed_cases_female),
      },
      'w%7CuW': {
        type: 'number',
        number: Number(record.confirmed_cases_age_0_9),
      },
      'ks%5E%3B': {
        type: 'number',
        number: Number(record.confirmed_cases_age_10_19),
      },
      'vE~h': {
        type: 'number',
        number: Number(record.confirmed_cases_age_20_29),
      },
      'JAG_': {
        type: 'number',
        number: Number(record.confirmed_cases_age_30_39),
      },
      'Deg%5D': {
        type: 'number',
        number: Number(record.confirmed_cases_age_40_49),
      },
      '%5DVGH': {
        type: 'number',
        number: Number(record.confirmed_cases_age_50_59),
      },
      'Zr%7C%60': {
        type: 'number',
        number: Number(record.confirmed_cases_age_60_69),
      },
      'XduO': {
        type: 'number',
        number: Number(record.confirmed_cases_age_70_79),
      },
      '~%40%3DP': {
        type: 'number',
        number: Number(record.confirmed_cases_age_80_89),
      },
      '%40GEV': {
        type: 'number',
        number: Number(record.confirmed_cases_age_90_99),
      },
      'OiAD': {
        type: 'number',
        number: Number(record.confirmed_cases_age_100_109),
      },
      'D%3DMM': {
        type: 'number',
        number: Number(record.confirmed_cases_age_unknown),
      }
    }
  });
  console.log(response);
}

main();