import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

import User from 'App/Models/User'

export default class AuthController {
  /**
   * Login page
   */
  public async login_page({ view }: HttpContextContract) {
    return await view.render('auth/login');
  }

  /**
   * Register page
   */
  public async register_page({ view }: HttpContextContract) {
    return await view.render('auth/register');
  }

  /**
   * Login request authentification
   */
  public async login({ request, response, session, auth }: HttpContextContract) {
    const { username, password } = request.body();

    try {
      await request.validate(LoginValidator);

      await auth.use('web').attempt(username, password);

      return response.redirect('/');
    } catch (e) {
      session.flash('msgLogin', {
        messages: (e.messages !== undefined) ? e.messages : "auth.login.the_username_or_password_is_incorrect",
        type: "error"
      })

      return response.redirect().back();
    }
  }

  /**
   * Register request authentification
   */
  public async register({ request, response, session, auth }: HttpContextContract) {
    const { username, password } = request.body();

    try {
      await request.validate(RegisterValidator);

      await User.create({
        username: username,
        password: password
      })

      await auth.use('web').attempt(username, password);

      session.flash('msgRegister', {
        message: "Votre compte a bien été créé",
        type: "success"
      })

      return response.redirect('/');
    } catch (e) {
      session.flash('msgRegister', {
        messages: e.messages,
        type: "error"
      });

      console.log(e);

      return response.redirect().back();
    }
  }

  /**
   * Logout user authentification
   */
  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('web').logout();

      return response.redirect('/')
    } catch (e) {
      return e;
    }
  }
}
