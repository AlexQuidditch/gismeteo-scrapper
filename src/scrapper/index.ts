import {
  main,
  Request,
  RequestOptions,
  openRequestList,
  CheerioCrawler,
  CheerioCrawlerOptions,
  RequestList,
} from 'apify'

import { parseDaysFrom, parseTextFrom } from '../parser'

import { getUrlsList } from '../config'

export class Scrapper {
  private agent?: CheerioCrawler
  private requestList?: RequestList

  public constructor(
    protected name: string,
    protected urls: Array<string | Request | RequestOptions>,
    protected handler: CheerioCrawlerOptions['handlePageFunction']
  ) {
  }

  /**
   * run
   */
  public async run() {
    console.log('run')

    main( async () => {
      this.requestList = await openRequestList(this.name, this.urls)

      this.agent = new CheerioCrawler({
        requestList: this.requestList,
        handlePageFunction: this.handler,
      })

      await this.agent?.run()
    })
  }
}

export function init() {
  main(async () => {
    const urls = getUrlsList()
    console.log(urls)
    // Create a RequestList
    console.log('init')
    const requestList = await openRequestList('gismeteo', [
      { url: 'http://www.example.com/page-1' },
      { url: 'http://www.example.com/page-2' },
      { url: 'http://www.example.com/page-3' },
    ])
    // Function called for each URL
    const handlePageFunction: CheerioCrawlerOptions['handlePageFunction'] = async ({ request, $ }) => {
      if (!$) { return }

      console.log({
        url: request.url,
        title: parseTextFrom($('title')),
        days: parseDaysFrom($('tr > td.first')),
      })
    }
    // Create a CheerioCrawler
    const crawler = new CheerioCrawler({
      requestList,
      handlePageFunction,
    })

    // Run the crawler
    await crawler.run()
  })
}
