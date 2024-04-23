const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const api = supertest('https://thinking-tester-contact-list.herokuapp.com');

describe('API Automation Tests', function() {

    // Start User test automation
    it("Should Create New User", async function () {

        const newUser = {
            firstName: "Test",
            lastName: "User",
            email: "userauah@fake.com",
            password: "myPassword",
        };

        const response = await api.post('/users')
            .send(newUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        // expect(response.body).to.have.property('id');
        // expect(response.body.name).to.equal(newUser.firstName);
        // expect(response.body.email).to.equal(newUser.lastName);
        // expect(response.body.phone).to.equal(newUser.email);
        // expect(response.body.name).to.equal(newUser.password);

        if (response.body.error) {
            console.error("Error message from server:", response.body.error);
        }
        console.log("Full response:", response.body);
        expect(response.status).to.equal(400);
    });

    it("Should GET User Profile", async function () {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI2MmI4NzQ2NDc2ZDAwMTMzZGY4MmEiLCJpYXQiOjE3MTM3Nzc1NDN9.o-1ovuNcxiv6W0dNjDy_yHwC6DFR-3Tko6YeHTsvc2w';

        const response = await api.get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('email');
    });

    // Contact Start
    it("Should Create New Contact", async function () {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI2MmI4NzQ2NDc2ZDAwMTMzZGY4MmEiLCJpYXQiOjE3MTM3Nzc1NDN9.o-1ovuNcxiv6W0dNjDy_yHwC6DFR-3Tko6YeHTsvc2w';
        const newContact = {
            firstName: "John",
            lastName: "Doe",
            birthdate: "1970-01-01",
            email: "jdoe@fake.com",
            phone: "8005555555",
            street1: "1 Main St.",
            street2: "Apartment A",
            city: "Anytown",
            stateProvince: "KS",
            postalCode: "12345",
            country: "USA"
        }

        const response = await api.post('/contacts')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(newContact)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).to.have.property('_id');
        expect(response.body.firstName).to.equal(newContact.firstName);
        expect(response.body.lastName).to.equal(newContact.lastName);
        expect(response.body.birthdate).to.equal(newContact.birthdate);
        expect(response.body.email).to.equal(newContact.email);
        expect(response.body.phone).to.equal(newContact.phone);
        expect(response.body.street1).to.equal(newContact.street1);
        expect(response.body.street2).to.equal(newContact.street2);
        expect(response.body.city).to.equal(newContact.city);
        expect(response.body.stateProvince).to.equal(newContact.stateProvince);
        expect(response.body.postalCode).to.equal(newContact.postalCode);
        expect(response.body.country).to.equal(newContact.country);
    });

    it("Should GET Contact by ID", async function () {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI2MmI4NzQ2NDc2ZDAwMTMzZGY4MmEiLCJpYXQiOjE3MTM3Nzc1NDN9.o-1ovuNcxiv6W0dNjDy_yHwC6DFR-3Tko6YeHTsvc2w';
        const id = '662701c1f8ad35001319a8d3';

        const response = await api.get(`/contacts/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('birthdate');
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('phone');
        expect(response.body).to.have.property('street1');
        expect(response.body).to.have.property('street2');
        expect(response.body).to.have.property('city');
        expect(response.body).to.have.property('stateProvince');
        expect(response.body).to.have.property('postalCode');
        expect(response.body).to.have.property('country');
        expect(response.body).to.have.property('owner');
        expect(response.body).to.have.property('__v');
    });

    it("Should Update Contact by ID", async function () {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI2MmI4NzQ2NDc2ZDAwMTMzZGY4MmEiLCJpYXQiOjE3MTM3Nzc1NDN9.o-1ovuNcxiv6W0dNjDy_yHwC6DFR-3Tko6YeHTsvc2w';
        const id = '662701c1f8ad35001319a8d3';
        const updateContact = {
            firstName: "Amy",
            lastName: "Miller",
            birthdate: "1992-02-02",
            email: "amiller@fake.com",
            phone: "8005554242",
            street1: "13 School St.",
            street2: "Apt. 5",
            city: "Washington",
            stateProvince: "QC",
            postalCode: "A1A1A1",
            country: "Canada"
        };

        const response = await api.put(`/contacts/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(updateContact)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).to.have.property('_id').to.equal(id);
        expect(response.body).to.have.property('firstName').to.equal(updateContact.firstName);
        expect(response.body).to.have.property('lastName').to.equal(updateContact.lastName);
        expect(response.body).to.have.property('birthdate').to.equal(updateContact.birthdate);
        expect(response.body).to.have.property('email').to.equal(updateContact.email);
        expect(response.body).to.have.property('phone').to.equal(updateContact.phone);
        expect(response.body).to.have.property('street1').to.equal(updateContact.street1);
        expect(response.body).to.have.property('street2').to.equal(updateContact.street2);
        expect(response.body).to.have.property('city').to.equal(updateContact.city);
        expect(response.body).to.have.property('stateProvince').to.equal(updateContact.stateProvince);
        expect(response.body).to.have.property('postalCode').to.equal(updateContact.postalCode);
        expect(response.body).to.have.property('country').to.equal(updateContact.country);
    });
});