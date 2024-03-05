import authController from "../authController.js";
import { describe, beforeEach, expect, it, vi } from "vitest";

describe("POST", () => {
	let req, res, next;
	beforeEach(() => {
		req = {
			body: {},
			cookies: {},
		};
		res = {
			cookie: vi.fn(),
			send: vi.fn(),
		};
		next = vi.fn();
	});
	describe("setCookie", () => {
		it("should set a cookie for valid credentials", () => {
			req.body.user = "spaceCadet";
			req.body.pass = "ilovespace";
			authController.setCookie(req, res, next);
			expect(res.cookie).toHaveBeenCalledWith("token", "spaceCadet");
			expect(next).toHaveBeenCalled();
		});
		it("should send error message for invaild credentials", () => {
			req.body.user = "invalidUser";
			req.body.pass = "invalidPass";
			authController.setCookie(req, res, next);
			expect(res.send).toHaveBeenCalledWith("Unsuccessful login attempt");
			expect(next).not.toHaveBeenCalled();
		});
	});
	describe("verifyUser", () => {
		it("should allow access for valid token", () => {
			req.cookies.token = "spaceCadet";
			authController.verifyUser(req, res, next);
			expect(next).toHaveBeenCalled();
		});
		it("should send error message for invalid token", () => {
			req.cookies.token = "invalidToken";
			authController.verifyUser(req, res, next);
			expect(res.send).toHaveBeenCalledWith(
				"You must be signed in to view this page"
      );
      expect(next).not.toHaveBeenCalled();
		});
	});
});

// describe("POST /", () => {
//   test("should return token on successful login", () => {
//     const response = response(app)
//       .post('/')
//       .send({
//         user: 'spaceCader',
//         pass: 'ilovespace'
//       })
//       .expect(200);
//     expect(response.body).toHaveProperty('token');
//   });
//   test('should return 401 Unauthorized for invalid credentials',  () => {
//      request(app)
//       .post('/')
//       .send({
//         user: 'test',
//         pass: 'incorrect'
//       })
//       .expect(401);
//   });
// });
