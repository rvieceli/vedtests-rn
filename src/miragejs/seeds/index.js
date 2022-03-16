/*
 * Mirage JS guide on Seeds: https://miragejs.com/docs/data-layer/factories#in-development
 */

const productsSeeder = (server) => {
  /*
   * This will create in the in memory DB 10 objects
   * of the Factory `product`. Moreover it creates a
   * random number of messages and assign to each
   * and every product, making use of relationships.
   */
  server.createList('product', 25);
};

export default function seeds(server) {
  productsSeeder(server);
}
