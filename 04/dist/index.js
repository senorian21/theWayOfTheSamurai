"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BED_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const jsonBodyMiddleWare = express_1.default.json();
app.use(jsonBodyMiddleWare);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation' },
        { id: 4, title: 'devops' },
    ],
};
app.get('/courses', (req, res) => {
    //res.send({message: 'Hello World!'}) //лучше не использовать (слишком умное)
    //res.json({message: 'Hello World!'}) //для возрашение  json обьектов
    //res.sendStatus(404) //для возрашения ошибки
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === Number(req.params.id));
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUS.BED_REQUEST_400);
        return;
    }
    const createdCourse = {
        id: Number(new Date()),
        title: req.body.title,
    };
    db.courses.push(createdCourse);
    res.status(HTTP_STATUS.CREATED_201).json(createdCourse);
});
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== Number(req.params.id));
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUS.BED_REQUEST_400);
        return;
    }
    let foundCourse = db.courses.find(c => c.id === Number(req.params.id));
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
