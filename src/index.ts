import { Scrapper } from './scrapper'
import { getUrlsList } from './config'
import {
  parseDaysFrom,
  parseTextFrom,
  parseMorningWindFrom,
  parseEveningWindFrom,
} from './parser'

import { exportResult } from './exporter'

function main() {
  try {
    new Scrapper(
      'gismeteo',
      getUrlsList(),
      async ({ request, $ }) => {
        if (!$) { return }

        const days = parseDaysFrom($('tr > td.first'))
        const morning = parseMorningWindFrom($('tr > td:nth-child(6) > span'))
        const evening = parseEveningWindFrom($('tr > td:nth-child(11) > span, td.last'))

        console.log({
          url: request.url,
          title: parseTextFrom($('title')),
        })

        const result: Array<{
          date: string;
          morning: string;
          evening: string;
        }> = days.map((day, i) => ({
            date: request.url.substring(request.url.length - 7, request.url.length) + `/${day.length < 2 ? 0 + day : day}`,
            morning: morning[i] && morning[i].length ? morning[i] : '-',
            evening: evening[i] && evening[i].length ? evening[i] : '-',
          }))

        exportResult(request.url.substring(request.url.length - 7, request.url.length), result)
      }
    ).run()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
