import Milestone from 'App/Models/Milestone';
import BaseRepository from './Base/BaseRepository';

export default class ProductRepo extends BaseRepository {
  // create an instance of the BaseRepository class
  // protected Repository = new BaseRepository(Product);

  constructor() {
    super(Milestone);
  }
  public async saveMilestone(data) {
    return super.createModel(data);
  }

  public async updateMilestone(id, data) {
    return super.updateModel(id, data);
  }

  public async deleteMilestone(id) {
    return super.deleteById(id);
  }
}
