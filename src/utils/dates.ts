import {
  format,
  parseISO,
  eachDayOfInterval,
} from 'date-fns'

export function formatDateWithMask(date: string, mask = 'yyyy/MM') {
  return format(parseISO(date), mask)
}

export function getMonthsInRange(start: string, end: string) {
  const preResult = eachDayOfInterval({
    start: parseISO(start),
    end: parseISO(end),
  }).map(v => formatDateWithMask(v.toISOString()))

  const result = Array.from(new Set(preResult))
  return result
}
