import { config } from 'dotenv'
import { Request, RequestOptions } from 'apify'

import { getMonthsInRange } from '../utils'

config()

const DATE_FROM = process.env.DATE_FROM || ''
const DATE_TO = process.env.DATE_TO || ''
const CITY_ID = process.env.CITY_ID || ''

console.log({
  CITY_ID,
  DATE_FROM,
  DATE_TO,
})


const baseUrl = 'https://www.gismeteo.ru/diary/' + CITY_ID + '/'

export function getUrlsList(): Array<string | Request | RequestOptions> {
  const months = getMonthsInRange(DATE_FROM, DATE_TO)
  return months.map(month => ({ url: baseUrl + month }))
}
