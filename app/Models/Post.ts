import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Author from './Author'
import Category from './Category'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'author_id' })
  public authorId: number

  @column({ columnName: 'category_id' })
  public categoryId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Author)
  public author: BelongsTo<typeof Author>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
}
