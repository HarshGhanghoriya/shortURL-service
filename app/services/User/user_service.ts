import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export class UserService {
  constructor(private ctx: HttpContext) {}

  all() {
    console.log(this.ctx.auth.user, 'auth-suer')
    // return users from db
  }
}
