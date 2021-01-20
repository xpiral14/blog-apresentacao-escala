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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'AuthorsController.index')
  Route.get('/:id', 'AuthorsController.find')
  Route.delete('/:id', 'AuthorsController.delete')
  Route.post('/', 'AuthorsController.create')
  Route.put('/:id', 'AuthorsController.update')
}).prefix('/author')

Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.get('/:id', 'CategoriesController.find')
  Route.post('/', 'CategoriesController.create')
  Route.delete('/:id', 'CategoriesController.delete')
  Route.put('/:id', 'CategoriesController.update')
}).prefix('/category')
