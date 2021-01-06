import cheerio from 'cheerio'

export function parseDaysFrom(selector: cheerio.Cheerio) {
  const days: string[] = []
  selector.each((i, el) => days.push(cheerio(el).text()))
  return days
}

export function parseTextFrom(selector: cheerio.Cheerio) {
  return selector.text()
}

export function parseMorningWindFrom(selector: cheerio.Cheerio) {
  const values: string[] = []
  selector.each((i, el) => values.push(cheerio(el).text().replace(' ', ',')))
  return values
}

export function parseEveningWindFrom(selector: cheerio.Cheerio) {
  const values: string[] = []
  selector.each((i, el) => values.push(cheerio(el).text().replace(' ', ',')))
  return values
}
