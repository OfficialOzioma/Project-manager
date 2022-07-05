import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ProjectRepo from 'App/Repository/ProjectRepo'

export default class ProjectsController extends ProjectRepo {

  public async index({ response, auth }: HttpContextContract) {

    const user = await auth.authenticate();

    const projects = await this.findbyAuth('user_id', user.id);

    if (projects.length === 0)
      return { message: `You don't have any projects yet` };
    else
      return response.json(projects)
  }

  public async show({ params, response }: HttpContextContract) {

    const project = await this.findById(params.id);

    if (project) {

      await project.load('user');
      await project.load('milestones');

      return response.json(project)


    } else {
      return { Message: 'Sorry, Product not found' };
    }
  }


  public async store({ request, auth }: HttpContextContract) {

    const newProjectSchema = schema.create({
      name: schema.string({ trim: true }, [rules.unique({ table: 'projects', column: 'name' })]),
      starting: schema.date({ format: 'dd-MM-yyyy' }),
      ending: schema.date({ format: 'dd-MM-yyyy' }),
      description: schema.string(),
      total_amount: schema.number(),
      status: schema.boolean(),
    });
    const payload = await request.validate({ schema: newProjectSchema });

    const user = await auth.authenticate();

    const data = {
      name: payload.name,
      userId: user.id,
      starting: payload.starting,
      ending: payload.ending,
      status: payload.status,
      description: payload.description,
      total_amount: payload.total_amount,
    };
    const newProduct = await this.saveProject(data);

    return { message: `Project created succussfully`, Project: newProduct };
  }

  public async update({ auth, request, params }: HttpContextContract) {

    const updateProjectSchema = schema.create({
      name: schema.string({ trim: true }),
      starting: schema.string(),
      ending: schema.string(),
      description: schema.string(),
      total_amount: schema.number(),
      status: schema.boolean(),
    });

    const payload = await request.validate({ schema: updateProjectSchema });

    const user = await auth.authenticate();

    const data = {
      name: payload.name,
      userId: user.id,
      starting: payload.starting,
      ending: payload.ending,
      status: payload.status,
      description: payload.description,
      total_amount: payload.total_amount,
    };

    const project = await this.updateProject(params.id, data);

    if (project) {
      return { message: `Project updated succussfully` }
    } else {
      return { message: `Error, sorry we couldn't update the project'` }
    }

  }

  public async destroy({ params }: HttpContextContract) {
    try {
      await this.deleteProject(params.id);
      return { message: `Project, deleted succussfully` };
    } catch (error) {
      return { error: `Project not found` };
    }
  }

}
