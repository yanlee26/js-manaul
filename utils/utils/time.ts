import moment, { Moment } from 'moment'

const FORMAT = 'YYYY/MM/DD HH:mm:ss'
export const FORMAT4BE = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT_DATE_4BE = 'YYYY-MM-DD'
export const FORMATWEEK = 'YYYY/MM/DD'
export const FORMAT_TIME = 'HH:mm'
export const FORMATWEEK_WITH_HM = 'YYYY/MM/DD HH:mm'
export const FORMAT_STAMP = 'YYYYMMDDHHmmss'

export type Units =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
// utcstr -> timestring
export const formatUnixTime = (timestamp: number | string, format = FORMAT) => {
  if (typeof timestamp === 'string') return moment(timestamp).format(format)

  return timestamp ? moment.unix(timestamp).format(format) : '-'
}

export const formatTime = (str: string | number, format = FORMAT) => moment(str).format(format)
export const withinFormatTime = (str: Moment | string | number, format = FORMAT) => moment(str, format)

export function startTime(str: string | number) {
  const nowTimeDate = new Date(str)
  return nowTimeDate.setHours(0, 0, 0, 0)
}

export function endTime(str: string | number) {
  const nowTimeDate = new Date(str)
  return nowTimeDate.setHours(23, 59, 59, 999)
}

export function fullDayDuration(duration: Array<number | string>, format = FORMAT4BE) {
  return duration.map((x, i) => (!i ? formatTime(startTime(x), format) : formatTime(endTime(x), format)))
}

export const addTime = (str: string, num: number, unit: Units, format = FORMAT) =>
  moment(str)
    .add(num, unit)
    .format(format)

export const subtractTime = (str: string, num: number, unit: Units, format = FORMAT) =>
  moment(str)
    .subtract(num, unit)
    .format(format)
// timestring -> utc string
export const formatString2UTC = (str: string) =>
  moment(str)
    .utcOffset(8)
    .format()

export function timestamp2moment(timestamp: number) {
  if (!timestamp) {
    return null
  }

  return moment(new Date(timestamp * 1000))
}

export function moment2timestamp(momentObj: any) {
  if (!momentObj) {
    return null
  }

  return Math.round(momentObj.unix())
}

const genWeekArray = (i: number, isPrev = false) => new Array(7).fill(0).map(() => (isPrev ? i-- : i++))
// 周选择与切换
export function getCurrentWeek(format = FORMAT_DATE_4BE) {
  const week = genWeekArray(0).map(y =>
    moment()
      .weekday(y)
      .format(format)
  )
  return week
}

/**
 * @param i: 上i周一和上i周日的日期
 */
export function getLastWeek(i = 1, format = FORMAT_DATE_4BE) {
  const weekOfDay = parseInt(moment().format('E')) //计算今天是这周第几天
  const j = weekOfDay + 7 * i - 1
  return genWeekArray(j, true).map(y =>
    moment()
      .subtract(y, 'days')
      .format(format)
  )
}

/**
 * @param i: 下i周一和下i周日的日期
 */
export function getNextWeek(i = 1, format = FORMAT_DATE_4BE) {
  const weekOfDay = parseInt(moment().format('E'))
  const j = 7 - weekOfDay + 7 * (i - 1) + 1
  return genWeekArray(j).map(y =>
    moment()
      .add(y, 'days')
      .format(format)
  )
}

export function tidyTime(time: number) {
  const seconds = Math.round(time / 1000)
  return [
    `0${parseInt(String(seconds / 60 / 60))}`.substr(-2),
    `0${parseInt(String((seconds / 60) % 60))}`.substr(-2),
    `0${(seconds % 60) % 60}`.substr(-2)
  ].join(':')
}

export const dateStrFormat = (date: string, dateFormat = FORMAT) => moment(date, dateFormat)
