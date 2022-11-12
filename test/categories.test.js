const request = require('supertest');
const myReq = request(`http://localhost:3000`);
const chai = require('chai');
const expect = chai.expect;

describe('Categories endpoints (CRUD) tests', () => {

    it('should list all categories (GET /categories)', async function() {
        let response = await myReq.get('/categories')
        expect(response.body.code).to.eql(200);
        expect(response.body.body.length).to.eql(0);
    })

    it('should add a category (POST /categories)', async function() {
        const category = {
            name: "prueba",
            description: "test category"
        }

        let response = await myReq.post('/categories').send(category);
        expect(response.body.code).to.be.equal(200);

        const newCategory = response.body.body;
        expect(newCategory).to.include.keys('name', 'description');
        expect(newCategory.name).to.eql(category.name);
        expect(newCategory.description).to.eql(category.description);

        let allCategories = await myReq.get('/categories')
        expect(allCategories.body.body.length).to.eql(1);
    })

    it('should show an error if the new category format is wrong (POST /categories)', async () => {
        const category = {
            nombre: "prueba",
            description: "test category"
        }

        let response = await myReq.post('/categories').send(category);

        expect(response.statusCode).to.be.equal(500);
    })

    it('should update a existing category (PUT /categories/:id)', async () => {
        const newCategory = {
            name: "prueba",
            description: "TEST category"
        }

        let allCategories = await myReq.get('/categories');

        let categoryId = allCategories.body.body[0].id;

        let response = await myReq.put(`/categories/${categoryId}`).send(newCategory);

        let modifiedCategory = response.body.body;

        expect(modifiedCategory[0]).to.eql(1);
        expect(response.body.code).to.be.equal(200);
    })

    it('should show an error if searched category id does not exist (PUT /categories/:id', async () => {
        const newCategory = {
            name: "prueba",
            description: "TEST categoryyy"
        }

        let categoryId = 88888889;

        let response = await myReq.put(`/categories/${categoryId}`).send(newCategory);

        expect(response.statusCode).to.eql(404);
        expect(response.body.code).to.eql(undefined); 
    })

    it('should show an error if updated category has a wrong format (PUT /categories/:id)', async () => {
        const newCategory = {
            nombre: "prueba",
            description: "TEST category"
        }

        let allCategories = await myReq.get('/categories');

        let categoryId = allCategories.body.body[0].id;

        let response = await myReq.put(`/categories/${categoryId}`).send(newCategory);

        let modifiedCategory = response.body.body;

        expect(modifiedCategory[0]).to.eql(0);
    })

    it('should delete category with given id (DELETE /categories/:id)', async function() {
        let allCategories = await myReq.get('/categories');
        let categoryId = allCategories.body.body[0].id;

        let response = await myReq.delete(`/categories/${categoryId}`);
        allCategories = await myReq.get('/categories');

        expect(response.body.code).to.eql(200); 
        expect(allCategories.body.body.length).to.eql(0);
    })

    it('should show an error if given id category does not exist (DELETE /categories/:id)', async () => {
        let categoryId = 214215124125;

        let response = await myReq.delete(`/categories/${categoryId}`);

        expect(response.statusCode).to.eql(404);
        expect(response.body.code).to.eql(undefined); 
    })

    before(function() {
        console.log('\n ------------------------COMIENZO TOTAL DEL TEST----------------------------')
    })

    after(function() {
        console.log('\n ------------------------FIN TOTAL DEL TEST----------------------------')
    }) 
});