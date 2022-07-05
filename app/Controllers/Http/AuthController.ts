import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import UserRepo from "App/Repository/UserRepo"

export default class AuthController extends UserRepo {

  public async login({ request, auth }: HttpContextContract) {
    try {
      const email = request.input('email');
      const password = request.input('password');
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '10 days',
      });

      return token.toJSON();

    } catch (error) {

      return error;
    }

  }

  public async register({ request, auth }: HttpContextContract) {

    const newUserSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.minLength(8)]),
    });

    const payload = await request.validate({
      schema: newUserSchema,
      messages: {
        'required': 'The {{ field }} is required to create a new account',
        'username.unique': 'Username has been used',
        'email.unique': 'Email has been used',
        'password.minLength': 'Password must be at least 8 characters long',
      },
    });

    const data = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };
    const user = await this.createUser(data);

    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    });

    return token.toJSON();



  }
}
