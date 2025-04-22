/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', '#controllers/users_controller.register')

router.post('/login', '#controllers/users_controller.login')

router.delete('/logout', '#controllers/users_controller.logout').use(middleware.auth())

router.get('/me', '#controllers/users_controller.me').use(middleware.auth())

router.post('/shorten', '#controllers/urls_controller.createUrl').use(middleware.auth())

router.get('/url/:id', '#controllers/urls_controller.getUrl')
