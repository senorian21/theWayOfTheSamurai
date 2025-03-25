"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const jsonBodyMiddleWare = express_1.default.json();
exports.app.use(jsonBodyMiddleWare);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation' },
        { id: 4, title: 'devops' },
    ],
};
exports.app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === Number(req.params.id));
    if (!foundCourse) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(foundCourse);
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const createdCourse = {
        id: Number(new Date()),
        title: req.body.title,
    };
    db.courses.push(createdCourse);
    res.status(exports.HTTP_STATUS.CREATED_201).json(createdCourse);
});
exports.app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== Number(req.params.id));
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT);
});
exports.app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    let foundCourse = db.courses.find(c => c.id === Number(req.params.id));
    if (!foundCourse) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT);
});
exports.app.delete('/__tests__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
