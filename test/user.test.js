const request  = require('supertest')
const myReq = request(`http://localhost:8000`)
const {expect} = require('chai')

describe('Users endpoints test',() => {
    it('returns list of users GET /users', async function() {
        const response = await myReq.get('/users')
        expect(response.body.code).to.equal(200)
    })
    it('It should return created user POST (/users)', async function() {
        const testUser = {
            firstName: 'prueba',
            lastName: 'Apellido',
            email: 'pruebaas@gmail.com',
            password: 'prueba'
        }
        const response = await myReq.post('/users').send(testUser)
        expect(response.body.code).to.be.equal(201)
    })
    it('retornar token al hacer login (POST /auth/login)', async function() {
        const datUser = {
            email: 'test_04@gmail.com',
            password: 'passTest'
        }

        const respose = await myReq.post('/auth/login').send(datUser)
        expect(respose.body.code).to.be.eql(200)
        const auth = respose.body.body
        expect(auth).to.include.keys('status', 'token')
        expect(auth.token).to.eql(auth.token)
    })

    it('It should return the one user by id (GET /users/:id)', async function() {
        const respose = await myReq.get('/users/1')
        expect(respose.body.code).to.eql(200)
    })

    it('It should return status 404 at get user by id (GET /users/:id)', async function() {
        const respose = await myReq.get('/users/400')
        expect(respose.status).to.eql(404)
    })

    it('It should return message with deleted user (DELETE /users/:id)', async function(){
        const response = await myReq.delete('/users/1')
        expect(response.body.code).to.eql(201)
        expect(response.body.status).to.eql(true)
    })
    it('It should return message with updated (PUT /users/:id)', async function(){
        const userUpdated = {
            firstName: 'prueba 2',
            lastName: "apellido prueba",
            email: "test_01@gmail.com",
            password: "root",
            avatar: "avatar_06.jpg",
            roleleId: 2
        }
        const response = await myReq.put('7users/1').send(userUpdated)
        expect(response.body.code).to.eql(201)
    })

    before(function() {
        console.log('\n ------------------------COMIENZO TOTAL DEL TEST----------------------------')
    })

    after(function() {
        console.log('\n ------------------------FIN TOTAL DEL TEST----------------------------')
    }) 
})
