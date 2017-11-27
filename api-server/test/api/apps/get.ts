import { expect } from "chai";
import { Express } from "express";
import { sign } from "jsonwebtoken";
import request = require("supertest");

import { JWT_SECRET } from "config";
import getApp from "getApp";
import App from "models/App";
import insertFixtures from "../../insertFixtures";

describe("api GET /apps", () => {
    let server: Express;
    const token = sign({ sub: "sub" }, JWT_SECRET);

    beforeEach(async () => {
        server = await getApp();
        await insertFixtures({
            apps: [{ id: "1", name: "1" }, { id: "2", name: "2" }]
        });
    });

    it("200 and returns all apps", async () => {
        const response = await request(server)
            .get("/apps")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
        expect(response.body).to.have.length(2);
        expect(response.body.map((app: App) => app.id)).to.deep.equal([
            "1",
            "2"
        ]);
    });
});
