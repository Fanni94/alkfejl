'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


Route.get('/egyenleg', 'BudzseController.egyenleg').middleware('auth')
Route.post('/egyenleg', 'BudzseController.koltsegFeldolgozas').middleware('auth')
Route.get('/egyenleg/:id/delete', 'BudzseController.deleteKoltseg').middleware('auth')
Route.get('/', 'BudzseController.index')

Route.get('/csalad', 'CsaladController.index').middleware('auth')
Route.get('/csalad/join/:id', 'CsaladController.join').middleware('auth')
Route.get('/csalad/create', 'CsaladController.create').middleware('auth')
Route.post('/csalad/create', 'CsaladController.createFeldolgozas').middleware('auth')
Route.get('/csalad/:id/delete', 'CsaladController.delete').middleware('auth')
Route.post('/csalad/jogosultsag', 'CsaladController.jogosultsag').middleware('auth')

Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
