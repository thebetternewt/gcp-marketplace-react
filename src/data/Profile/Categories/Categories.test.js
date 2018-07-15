import Categories from "./Categories";

describe("Categories", () => {
  describe("constructor", () => {
    it("binds uid to the class", () => {
      const testUid = "4815162342";
      const testCategories = new Categories(testUid);

      expect(testCategories.uid).toBe(testUid);
    });
  });
});
