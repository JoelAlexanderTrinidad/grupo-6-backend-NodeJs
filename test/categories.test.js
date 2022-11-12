const request = require('supertest');
const myReq = request(`http://localhost:3000`);
const chai = require('chai');
const expect = chai.expect;

describe('Categories endpoints (CRUD) tests', () => {

    it('should list all categories (GET /categories)', async function() {
        let response = await myReq.get('/categories')
        console.log(response.body)
        expect(response.body.code).to.eql(200);
        expect(response.body.body.length).to.eql(0);
    })

    it('should add a product (POST /categories)', async function() {
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

    it('should delete category with given id (DELETE /categories/:id)', async function() {
        let allCategories = await myReq.get('/categories');
        let categoryId = allCategories.body.body[0].id;

        let response = await myReq.delete(`/categories/${categoryId}`);
        allCategories = await myReq.get('/categories');

        expect(response.body.code).to.eql(200); 
        expect(allCategories.body.body.length).to.eql(0);
    })

    before(function() {
        console.log('\n ------------------------COMIENZO TOTAL DEL TEST----------------------------')
    })

    after(function() {
        console.log('\n ------------------------FIN TOTAL DEL TEST----------------------------')
    }) 
});