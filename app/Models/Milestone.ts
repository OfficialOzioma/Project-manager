import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Project from './Project'

export default class Milestone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public starting: string

  @column()
  public ending: string

  @column()
  public amount: number

  @column()
  public projectId: number

  @column()
  public userId: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

}
