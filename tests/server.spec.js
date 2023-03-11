const request = require("supertest");
const server = require("../index");

let token = '';

describe("Server back-jg-fitness", () => {

    describe("login", () => {
        it("POST/login devuelve status 200 y obtiene el token", async () => {
            const user = {
                email: 'jovy@gmail.cl',
                password: '1234'
            };
            const response = await request(server).post("/login").send(user);
            const status = response.statusCode;

            token = response.text;
            expect(status).toBe(200);
        })
    })

    describe("entrenador", () => {
        it("GET/entrenadores devuelve status 200", async () => {
            const response = await request(server).get("/entrenadores")
                                .set('Authorization', 'Bearer ' + token).send();
            const status = response.statusCode;

            expect(status).toBe(200);
        })  
    })

    describe("servicios", () => {
        it("GET/servicios segun entrenador, devuelve status 200", async () => {
            const response = await request(server).get("/servicios")
                                .set('Authorization', 'Bearer ' + token)
                                .query({ 'entrenador_id': '2' })
                                .send();
            const status = response.statusCode;

            expect(status).toBe(200);
        })  
    })

    describe("servicios", () => {
        it("GET/servicio segun usuario, devuelve status 200", async () => {
            const response = await request(server).get("/servicio")
                                .set('Authorization', 'Bearer ' + token)
                                .query({ 'usuario_id': '1' })
                                .send();
            const status = response.statusCode;

            expect(status).toBe(200);
        })  
    })

});
