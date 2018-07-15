import { getCategories } from "./../index";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCCESS
} from "./../../types";
jest.mock("./../../../../data/Profile/Categories");
import Categories from "./../../../../data/Profile/Categories";

describe("Categories Actions", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe("getCategories()", () => {
    it("dispatches init type", () => {
      getCategories()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: GET_CATEGORIES });
    });

    it("dispatches a success when Categories.get() resolves", async () => {
      const testCategories = ["Popping", "Locking", "Dropping"];
      const getSuccessMock = jest.fn(() => {
        return new Promise(resolve => {
          resolve(testCategories);
        });
      });
      Categories.prototype.get.mockImplementation(getSuccessMock);

      await getCategories()(dispatch);

      const expectedAction = {
        type: GET_CATEGORIES_SUCCESS,
        categories: testCategories
      };

      expect(dispatch.mock.calls[1][0]).toEqual(expectedAction);
    });

    it("dispatches a failure when Categories.get() reject", async () => {
      const testError = "Gee dang it, something broke";
      const getFailureMock = jest.fn(() => {
        return new Promise((resolve, reject) => {
          reject(testError);
        });
      });
      Categories.prototype.get.mockImplementation(getFailureMock);

      await getCategories()(dispatch);

      const expectedAction = {
        type: GET_CATEGORIES_FAILED,
        error: testError
      };

      expect(dispatch.mock.calls[1][0]).toEqual(expectedAction);
    });
  });
});
