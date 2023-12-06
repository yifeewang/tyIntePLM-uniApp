// 日期格式化
export const formatDate = (date, fmt = 'YYYY-MM-dd HH:mm:ss') => {
  if (date == null) return null;
  if (typeof date === 'string') {
    date = date.slice(0, 19).replace('T', ' ').replace(/-/g, '/');
    date = new Date(date);
  } else if (typeof date === 'number') {
    date = new Date(date);
  }
  const o = {
    '[Yy]+': date.getFullYear(), // 年
    'M+': date.getMonth() + 1, // 月份
    '[Dd]+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[`${date.getDay()}`]
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return fmt;
};
// 判断时间是否在本月
export const isSameMonth = function (inDate) {
  // inDate 是一个date对象
  const nowDate = new Date();
  return (
    nowDate.getFullYear() === new Date(inDate).getFullYear() &&
    nowDate.getMonth() === new Date(inDate).getMonth()
  );
};

// 判断时间是否在本周
export const isSameWeek = function (inDate) {
  // inDate 是一个date对象
  const inDateStr = new Date(inDate).toLocaleDateString(); // 获取如YYYY/MM/DD的日期
  const nowDate = new Date();
  const nowTime = nowDate.getTime();
  const nowDay = nowDate.getDay();
  for (let i = 0; i < 7; i++) {
    if (
      inDateStr ===
      new Date(nowTime + (i - nowDay) * 24 * 3600 * 1000).toLocaleDateString()
    )
      return true;
  }
  return false;
};
// 获取星期几
export const getWeekDate = (date) => {
  const day = new Date(date).getDay();
  const weeks = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  const week = weeks[day];
  return week;
};
// 获取当天零点
export const getTodayZeroTime = (date) => {
  return new Date(new Date().toLocaleDateString()).getTime();
};
// 判断时间是否在当天
export const isToday = (date) => {
  return new Date().toDateString() === new Date(date).toDateString();
};
// 判断时间是否在昨天
export const isYestday = (theDate) => {
  const date: any = new Date();
  const yesterday: any = new Date(date - 1000 * 60 * 60 * 24);
  const test: any = new Date(theDate);
  if (
    yesterday.getYear() === test.getYear() &&
    yesterday.getMonth() === test.getMonth() &&
    yesterday.getDate() === test.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};

// 获取月份的天数
export const getMonthDays = (year, month) => {
  const stratDate: any = new Date(year, month - 1, 1);
  const endData: any = new Date(year, month, 1);
  const days = (endData - stratDate) / (1000 * 60 * 60 * 24);
  return days;
};
