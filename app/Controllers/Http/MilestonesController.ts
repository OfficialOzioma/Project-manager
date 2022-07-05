import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import MilestoneRepo from 'App/Repository/MilestoneRepo'

export default class MilestonesController extends MilestoneRepo {

  public async index({ response, auth }: HttpContextContract) {

    const user = await auth.authenticate();

    const milestones = await this.findbyAuth('userId', user.id);

    if (milestones.length === 0) {
      return { message: `You don't have any milestone yet` }
    } else {
      return response.json(milestones)
    }
  }

  public async show({ params, response }: HttpContextContract) {

    const milestone = await this.findById(params.id);

    if (milestone) {

      await milestone.load('user');
      await milestone.load('project');

      return response.json(milestone)


    } else {
      return { Message: 'Sorry, milestone not found' };
    }
  }


  public async store({ request, auth }: HttpContextContract) {
    const project = await this.findByName('projects', request.input('project'));

    if (project) {
      const newMilestoneSchema = schema.create({
        name: schema.string({ trim: true }),
        starting: schema.string(),
        ending: schema.string(),
        description: schema.string(),
        amount: schema.number(),
        status: schema.boolean(),
      });
      const payload = await request.validate({ schema: newMilestoneSchema });

      const user = await auth.authenticate();

      const data = {
        name: payload.name,
        user_id: user.id,
        project_id: project.id,
        starting: payload.starting,
        ending: payload.ending,
        status: payload.status,
        description: payload.description,
        amount: payload.amount,
      };
      const newProduct = await this.saveMilestone(data);

      return { message: `Milestone created succussfully`, Milestone: newProduct };
    } else {
      return { Message: 'Sorry, Project not found' };
    }

  }

  public async update({ auth, request, params }: HttpContextContract) {

    const project = await this.findByName('projects', request.input('project'));

    if (project) {
      const updateMilestoneSchema = schema.create({
        name: schema.string({ trim: true }),
        starting: schema.string(),
        ending: schema.string(),
        description: schema.string(),
        amount: schema.number(),
        status: schema.boolean(),
      });

      const payload = await request.validate({ schema: updateMilestoneSchema });

      const user = await auth.authenticate();

      const data = {
        name: payload.name,
        userId: user.id,
        starting: payload.starting,
        ending: payload.ending,
        status: payload.status,
        description: payload.description,
        amount: payload.amount,
      };

      const milestone = await this.updateMilestone(params.id, data);

      if (milestone) {
        return { message: `Milestone updated succussfully` }
      } else {
        return { message: `Error, sorry we couldn't update the project'` }
      }
    } else { return { Message: 'Sorry, project not found' }; }

  }

  public async destroy({ params }: HttpContextContract) {
    try {
      await this.deleteMilestone(params.id);
      return { message: `Milestone, deleted succussfully` };
    } catch (error) {
      return { error: `Milestone not found` };
    }
  }

}
