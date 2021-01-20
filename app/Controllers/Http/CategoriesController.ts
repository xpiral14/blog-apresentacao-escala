import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ request }: HttpContextContract) {
    const { page, limit } = request.all()
    let users = await Category.query().paginate(page, limit)

    return users
  }

  public async find({ params }: HttpContextContract) {
    const users = await Category.query().where('id', params.id).first()
    return users
  }

  public async create({ request }: HttpContextContract) {
    const categoryData = await request.validate({
      schema: schema.create({
        name: schema.string({}, [
          rules.maxLength(50),
          rules.minLength(3),
          rules.unique({
            column: 'name',
            table: 'categories',
          }),
        ]),
        description: schema.string.optional({}, [rules.maxLength(255), rules.minLength(30)]),
      }),
      messages: {
        'name.unique': 'Já existe uma categoria com esse nome',
        'minLength':
          'O campo {{field}} deve ter um tamanho mínimo de {{options.minLength}} caracteres',
        'maxLength':
          'O campo {{field}} deve ter um tamanho máximo de {{options.maxLength}} caracteres',
        'required': 'O campo {{field}} é obrigatório',
      },
    })
    await Category.create(categoryData)
  }

  public async delete({ response, params }: HttpContextContract) {
    const author = await Category.findOrFail(params.id)

    await author.delete()

    return response.noContent()
  }

  public async update({ request, params }: HttpContextContract) {
    const categoryData = await request.validate({
      schema: schema.create({
        name: schema.string({}, [
          rules.maxLength(50),
          rules.minLength(3),
          rules.unique({
            column: 'name',
            table: 'categories',
          }),
        ]),
        description: schema.string.optional({}, [rules.maxLength(255), rules.minLength(30)]),
      }),
      messages: {
        'name.unique': 'Já existe uma categoria com esse nome',
        'minLength':
          'O campo {{field}} deve ter um tamanho mínimo de {{options.minLength}} caracteres',
        'maxLength':
          'O campo {{field}} deve ter um tamanho máximo de {{options.maxLength}} caracteres',
        'required': 'O campo {{field}} é obrigatório',
      },
    })

    const author = await Category.findOrFail(params.id)
    author.name = categoryData.name

    await author.save()
  }
}
