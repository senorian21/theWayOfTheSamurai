"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
describe('/course', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/__tests__/data');
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUS.OK_200, []);
    }));
    it('should return 404 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/9999999')
            .expect(src_1.HTTP_STATUS.NOT_FOUND_404);
    }));
    it("shouldn't create course with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: '' })
            .expect(src_1.HTTP_STATUS.BAD_REQUEST_400); // Исправлено BAD_REQUEST
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUS.OK_200, []);
    }));
    let createdCourse = null;
    it('should create course with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: 'new course' })
            .expect(src_1.HTTP_STATUS.CREATED_201);
        createdCourse = createResponse.body;
        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'new course',
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUS.OK_200, [createdCourse]);
    }));
    it("shouldn't update course with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/courses/${createdCourse.id}`)
            .send({ title: '' })
            .expect(src_1.HTTP_STATUS.BAD_REQUEST_400); // Исправлено BAD_REQUEST
        yield (0, supertest_1.default)(src_1.app)
            .get(`/courses/${createdCourse.id}`)
            .expect(src_1.HTTP_STATUS.OK_200, createdCourse);
    }));
    it("shouldn't update course that does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/courses/-100`)
            .send({ title: 'good title' })
            .expect(src_1.HTTP_STATUS.NOT_FOUND_404);
    }));
    it('should update course with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/courses/${createdCourse.id}`)
            .send({ title: 'good new title' })
            .expect(src_1.HTTP_STATUS.NO_CONTENT);
        yield (0, supertest_1.default)(src_1.app)
            .get(`/courses/${createdCourse.id}`)
            .expect(src_1.HTTP_STATUS.OK_200, Object.assign(Object.assign({}, createdCourse), { title: 'good new title' }));
    }));
    it('should delete course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete(`/courses/${createdCourse.id}`)
            .expect(src_1.HTTP_STATUS.NO_CONTENT);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUS.OK_200, []);
    }));
});
