import Project from 'App/Models/Project';
import BaseRepository from './Base/BaseRepository';

export default class ProductRepo extends BaseRepository {
  // create an instance of the BaseRepository class
  // protected Repository = new BaseRepository(Project);

  constructor() {
    super(Project);
  }

  public async saveProject(data) {
    return super.createModel(data);
  }

  public async updateProject(id, data) {
    return super.updateModel(id, data);
  }

  public async deleteProject(id) {
    return super.deleteById(id);
  }
}
