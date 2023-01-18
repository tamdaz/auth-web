import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  /**
   * Home page
   */
  public async home({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate();

    return view.render('index', {
      isLoggedIn: auth.isLoggedIn,
      name: auth.user?.username
    })
  }
}
