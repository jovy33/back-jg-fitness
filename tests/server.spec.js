const request = require("supertest");
const server = require("../index");

describe("Server back-jg-fitness", () => {

    describe("entrenador", () => {
        it("GET/entrenadores devuelve status 200", async () => {
            const response = await request(server).get("/entrenadores").send();
            const status = response.statusCode;

            expect(status).toBe(200);
        })
  
    })

});
