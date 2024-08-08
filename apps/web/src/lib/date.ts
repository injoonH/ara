type TimeUnit = Record<
  Exclude<Intl.RelativeTimeFormatUnitSingular, 'quarter'>,
  number
>

const getDeltaTimeUnit = (start: Date, end: Date): TimeUnit => {
  const delta = end.getTime() - start.getTime()

  if (delta < 0)
    return {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    }

  const second = Math.floor(delta / 1000)
  const minute = Math.floor(second / 60)
  const hour = Math.floor(minute / 60)
  const day = Math.floor(hour / 24)
  const week = Math.floor(day / 7)
  const month = Math.floor(day / 30)
  const year = Math.floor(month / 12)
  return { year, month, week, day, hour, minute, second }
}

export const getRelativeFormattedDate = (
  date: Date,
  locales?: Intl.LocalesArgument,
) => {
  const formatter = new Intl.RelativeTimeFormat(locales, { style: 'long' })

  const delta = getDeltaTimeUnit(date, new Date())
  const units = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
  ] as const

  for (const unit of units)
    if (delta[unit]) {
      return formatter.format(-delta[unit], unit)
    }

  return formatter.format(-0, 'second')
}
