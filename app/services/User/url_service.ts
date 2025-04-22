import { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'
import { inject } from '@adonisjs/core'
import crypto from 'node:crypto'

@inject()
export class UrlService {
  constructor(private ctx: HttpContext) {}

  public async get(shortUrl: string) {
    try {
      const longUrl = await Url.findBy('shortUrl', shortUrl)

      return longUrl
    } catch (e) {
      throw e
    }
  }

  public async createShortURL(url: string) {
    try {
      let shortURL = this.generateShortCode(url)
      const response = await Url.create({
        shortUrl: shortURL,
        longUrl: url,
      })
      return response
    } catch (e) {
      throw e
    }
  }

  private generateShortCode(URL: crypto.BinaryLike) {
    const hash = crypto.createHash('md5').update(URL).digest() // 16 bytes
    const first6Bytes = hash.subarray(0, 6) // 6 bytes = 48 bits
    const decimalValue = Number.parseInt(first6Bytes.toString('hex'), 16)
    return this.base62Encode(decimalValue)
  }

  private base62Encode(num: number) {
    const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    do {
      result = BASE62[num % 62] + result
      num = Math.floor(num / 62)
    } while (num > 0)
    return result
  }
}
