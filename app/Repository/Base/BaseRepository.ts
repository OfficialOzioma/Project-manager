/* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database';
import { LucidModel } from '@ioc:Adonis/Lucid/Orm';
import RepositoryInterface from '../Interface/RepositoryInterface';

export default class BaseRepository implements RepositoryInterface {


  protected modelName;

  /**
    * @description - This method is used to find a model by its name
    * @param {LucidModel} ModelName
    *
    * @returns {LucidModel}
    */
  constructor(model: LucidModel) {
    this.modelName = model;
  }


  public async findAll() {
    return await this.modelName.all();
  }

  public async findById(modelId: number) {
    return await this.modelName.find(modelId);
  }

  public async findbyAuth(column: any, authId: any, relation: any = null) {
    if (relation) {
      return await this.modelName.query().where(column, authId).load(relation);
    } else {
      return await this.modelName.query().where(column, authId);
    }
  }

  public async findAnything(column: any, value: any) {
    return await this.modelName.findBy(column, value)
  }

  public async findByName(tableName: any, name: any) {

    return Database.from(tableName)
      .where('name', name)
      .select('*')
      .first();
  }

  public async createModel(payload: any) {
    const model = this.modelName.create(payload);

    return model;
  }

  public async updateModel(modelId: number, payload: any) {

    return await this.modelName
      .query()
      .where('id', modelId)
      .update(payload)

  }

  public async deleteById(modelId: number) {
    const model = await this.modelName.find(modelId);

    return await model.delete();
  }
}
