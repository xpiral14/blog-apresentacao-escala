import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Author from 'App/Models/Author'
export default class AuthorsController {
  public async index({ request }: HttpContextContract) {
    const { page, limit } = request.all()
    let users = await Author.query().paginate(page, limit)

    return users
  }

  public async find({ params }: HttpContextContract) {
    const users = await Author.query().where('id', params.id).first()
    return users
  }

  public async create({ request }: HttpContextContract) {
    const userData = await request.validate({
      schema: schema.create({
        name: schema.string({}, [rules.maxLength(50), rules.minLength(3)]),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(4)]),
      }),
      messages: {
        email: 'O campo {{field}} deve ser um email válido',
        minLength:
          'O campo {{field}} deve ter um tamanho mínimo de {{options.minLength}} caracteres',
        maxLength:
          'O campo {{field}} deve ter um tamanho máximo de {{options.maxLength}} caracteres',
        required: 'O campo {{field}} é obrigatório',
      },
    })
    await Author.create(userData)
  }

  public async delete({ response, params }: HttpContextContract) {
    const author = await Author.findOrFail(params.id)

    await author.delete()

    return response.noContent()
  }

  public async update({ request, params }: HttpContextContract) {
    const userData = await request.validate({
      schema: schema.create({
        name: schema.string({ trim: true, escape: true }),
        email: schema.string({ trim: true, escape: true }, [rules.required(), rules.email()]),
      }),
      messages: {
        required: 'O campo {{field}} é obrigatório',
        unique: 'O campo {{field}} deve ser único',
        email: 'O campo {{field}} deve ser um email válido',
      },
    })

    const author = await Author.findOrFail(params.id)
    author.email = userData.email
    author.name = userData.name

    await author.save()
  }
}
