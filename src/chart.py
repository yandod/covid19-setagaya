import pandas as pd
import urllib.request
import json
import pprint
import matplotlib.pyplot as plt
import japanize_matplotlib
import matplotlib.dates as mdates

json_raw = ''
data = None
with urllib.request.urlopen('https://raw.githubusercontent.com/yandod/covid19-setagaya/main/data/output.json') as url:
  json_raw = url.read().decode()
  data = json.loads(json_raw)
  pprint.pprint(data['data'][:1])

# Fig 1

po = pd.read_json(json.dumps(data['data']))
fig, axes_inpatient = plt.subplots()

axes_inpatient.plot(po.iloc[:,0], po.iloc[:,3] ,'C0', label='入院中')
axes_home = axes_inpatient.twinx()
axes_home.plot(po.iloc[:,0], po.iloc[:,5] ,'C1', label='自宅療養中')

# 凡例をまとめる
h1, l1 = axes_inpatient.get_legend_handles_labels()
h2, l2 = axes_home.get_legend_handles_labels()
axes_inpatient.legend(h1+h2, l1+l2, loc='lower left')

myFmt = mdates.DateFormatter('%Y-%m-%d')
axes_inpatient.xaxis.set_major_formatter(myFmt)
axes_home.xaxis.set_major_formatter(myFmt)
fig.autofmt_xdate()

fig.set_size_inches(8,8)
plt.title('世田谷区検査陽性者数の状況')
plt.xlabel('date')
plt.ylabel('num')
plt.savefig('./data/fig1.png')

# Fig 2
po = pd.read_json(json.dumps(data['data']))
po.set_index('date', inplace=True)

fig, axes_age = plt.subplots()

plt.plot(po['confirmed_cases'].resample('W').max().pct_change(), label='all')
axes_age.plot(po['confirmed_cases_age_0_9'].resample('W').max().pct_change(), label='0-9')
axes_age.plot(po['confirmed_cases_age_10_19'].resample('W').max().pct_change(), label='10-19')
axes_age.plot(po['confirmed_cases_age_20_29'].resample('W').max().pct_change(), label='20-29')
axes_age.plot(po['confirmed_cases_age_30_39'].resample('W').max().pct_change(), label='30-39')
axes_age.plot(po['confirmed_cases_age_40_49'].resample('W').max().pct_change(), label='40-49')
axes_age.plot(po['confirmed_cases_age_50_59'].resample('W').max().pct_change(), label='50-59')
axes_age.plot(po['confirmed_cases_age_60_69'].resample('W').max().pct_change(), label='60-69')
axes_age.plot(po['confirmed_cases_age_70_79'].resample('W').max().pct_change(), label='70-79')
axes_age.plot(po['confirmed_cases_age_80_89'].resample('W').max().pct_change(), label='80-89')
axes_age.plot(po['confirmed_cases_age_90_99'].resample('W').max().pct_change(), label='90-99')


myFmt = mdates.DateFormatter('%Y-%m-%d')
axes_age.xaxis.set_major_formatter(myFmt)
fig.autofmt_xdate()

fig.set_size_inches(8,8)

plt.title('世田谷区検査陽性者数の増加率')
plt.xlabel('date')
plt.ylabel('増加率')

plt.legend()
plt.savefig('./data/fig2.png')

# Fig 3
po = pd.read_json(json.dumps(data['data']))
po.set_index('date', inplace=True)

fig, axes_age = plt.subplots()

axes_age.plot(po['confirmed_cases_male'].resample('W').max().pct_change(), label='男性')
axes_age.plot(po['confirmed_cases_female'].resample('W').max().pct_change(), label='女性')


myFmt = mdates.DateFormatter('%Y-%m-%d')
axes_age.xaxis.set_major_formatter(myFmt)
fig.autofmt_xdate()

fig.set_size_inches(8,8)

plt.title('世田谷区検査陽性者数の増加率')
plt.xlabel('date')
plt.ylabel('増加率')

plt.legend()
plt.savefig('./data/fig3.png')
