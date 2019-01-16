import { RequestHandler } from "express";
import faker from "faker";
import { range } from "lodash";

const names = range(10).map(() => faker.lorem.word());
const tags = range(10).map(() => faker.lorem.word());
const bundles = range(20).map(() => ({
    id: faker.random.alphaNumeric(8),
    hash: faker.random.alphaNumeric(255),
    name: faker.random.arrayElement(names),
    tag: faker.random.arrayElement(tags),
    description: faker.lorem.sentence(12),
    assets: [
        { path: "/index.html", mimeType: "text/html" },
        { path: "/js/index.js", mimeType: "application/js" },
        { path: "/css/index.css", mimeType: "text/css" }
    ],
    fallbackAssetPath: faker.random.arrayElement(["/index.html", "/404.html"]),
    fallbackStatusCode: faker.random.arrayElement([404, 200]),
    createdAt: faker.date.past()
}));

export default ((_req, res) => {
    if (Math.random() > 0.9) {
        res.status(400).send({ message: "Random error" });
    } else {
        res.status(200).send(bundles);
    }
}) as RequestHandler;
