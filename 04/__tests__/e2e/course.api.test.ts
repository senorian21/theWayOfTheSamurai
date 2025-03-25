import request from 'supertest';
import { app, HTTP_STATUS } from '../../src';

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__tests__/data');
    });

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUS.OK_200, []);
    });

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/9999999')
            .expect(HTTP_STATUS.NOT_FOUND_404);
    });

    it("shouldn't create course with incorrect input data", async () => {
        await request(app)
            .post('/courses')
            .send({ title: '' })
            .expect(HTTP_STATUS.BAD_REQUEST_400); // Исправлено BAD_REQUEST

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUS.OK_200, []);
    });

    let createdCourse: any = null;

    it('should create course with correct input data', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({ title: 'new course' })
            .expect(HTTP_STATUS.CREATED_201);
        createdCourse = createResponse.body;

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'new course',
        });

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUS.OK_200, [createdCourse]);
    });

    it("shouldn't update course with incorrect input data", async () => {
        await request(app)
            .put(`/courses/${createdCourse.id}`)
            .send({ title: '' })
            .expect(HTTP_STATUS.BAD_REQUEST_400); // Исправлено BAD_REQUEST

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(HTTP_STATUS.OK_200, createdCourse);
    });

    it("shouldn't update course that does not exist", async () => {
        await request(app)
            .put(`/courses/-100`)
            .send({ title: 'good title' })
            .expect(HTTP_STATUS.NOT_FOUND_404);
    });

    it('should update course with correct input data', async () => {
        await request(app)
            .put(`/courses/${createdCourse.id}`)
            .send({ title: 'good new title' })
            .expect(HTTP_STATUS.NO_CONTENT);

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(HTTP_STATUS.OK_200, {
                ...createdCourse,
                title: 'good new title',
            });
    });

    it('should delete course', async () => {
        await request(app)
            .delete(`/courses/${createdCourse.id}`)
            .expect(HTTP_STATUS.NO_CONTENT);

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUS.OK_200, []);
    });
});
