import { db } from "../../../firebase/firebase";
import { collectionKey } from "./constants";
/**
 * Handles database interactions for a user's categories
 */
class Categories {
  /**
   * Binds a user's add to the class instance
   * @param {string} uid
   */
  constructor(uid) {
    if (uid) {
      this.uid = uid;
    }
  }

  /**
   * Returns all categories
   * @returns {Promise} - All Categories data
   * @async
   */
  async get() {
    return new Promise(async (resolve, reject) => {
      db.collection(collectionKey)
        .get()
        .then(({ docs }) => {
          const categories = Array.from(docs).map(doc => doc.data().name);
          resolve(categories);
        })
        .catch(e => reject(`Error getting categories ${e}`));
    });
  }

  /**
   * Sets a user's categories
   * @param {Array<string>} categories
   */
  setUserCategories(categories) {
    db.collection(collectionKey)
      .doc(this.uid)
      .update({ categories });
  }
}

export default Categories;
