import { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class UsersController {
  public async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    const token = await User.accessTokens.create(user)

    // await auth.use('api').login(user)

    return response.status(201).json({ token })
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return response.status(201).json({ token })
  }

  public async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.status(200).json({ message: 'User is logged out successfully' })
  }

  public async me({ auth, response }: HttpContext) {
    await auth.check()

    return response.status(200).json({ user: auth.user })
  }
}
