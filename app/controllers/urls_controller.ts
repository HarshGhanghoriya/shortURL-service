import { UrlService } from '#services/User/url_service'
import { urlValidator } from '#validators/url_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UrlsController {
  constructor(private urlService: UrlService) {}

  public async createUrl({ request, response }: HttpContext) {
    const { longURL } = await request.validateUsing(urlValidator)

    const data = await this.urlService.createShortURL(longURL)

    return response.status(201).json({ data: data })
  }

  public async getUrl({ request, response }: HttpContext) {
    const shortURL = request.params().id

    const url = await this.urlService.get(shortURL)

    return response.status(301).redirect().toPath(url?.longUrl!)
  }
}
