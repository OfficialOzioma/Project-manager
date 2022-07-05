/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register');
  Route.post('login', 'AuthController.login');
  Route.group(() => {
    Route.get('projects', 'ProjectsController.index');
    Route.post('project', 'ProjectsController.store');
    Route.get('project/:id', 'ProjectsController.show');
    Route.put('project/:id', 'ProjectsController.update');
    Route.delete('project/:id', 'ProjectsController.destroy');

    Route.get('milestones', 'MilestonesController.index');
    Route.post('milestone/create', 'MilestonesController.store');
    Route.get('milestone/show/:id', 'MilestonesController.show');
    Route.put('milestone/update/:id', 'MilestonesController.update');
    Route.delete('milestone/delete/:id', 'MilestonesController.destroy');

  }).middleware('auth:api');
}).prefix('api');

