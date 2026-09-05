import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("./products.js", import.meta.url), "utf8");
const { products, colorways, priceFrom, getProduct } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

test("nine unique adult products retain supplied price ranges and evenly spaced prices", () => {
  assert.equal(products.length, 9);
  assert.equal(new Set(products.map(({ handle }) => handle)).size, 9);
  const expected = [[26,36],[28,38],[30,40],[26,36],[28,38],[30,40],[28,38],[30,40],[32,42]];
  products.forEach((product, index) => {
    const prices = product.sizes.map(({ price }) => price);
    const [minimum, maximum] = expected[index];
    assert.equal(priceFrom(product), minimum);
    assert.equal(prices.at(-1), maximum);
    const labels = product.category === "womens-plus" ? ["1X", "2X", "3X", "4X"] : ["S", "M", "L", "XL", "2XL"];
    assert.deepEqual(product.sizes.map(({ label }) => label), labels);
    const step = (maximum - minimum) / (labels.length - 1);
    prices.slice(1).forEach((price, i) => assert.ok(Math.abs(price - prices[i] - step) < 0.011));
  });
});

test("unconfirmed catalog cannot be purchased and never fabricates missing facts", () => {
  for (const product of products) {
    assert.equal(product.purchasable, false);
    assert.equal(product.confirmed, false);
    for (const field of ["fabric", "care", "shipping", "returns"]) assert.equal(product[field], null);
    for (const size of product.sizes) assert.deepEqual(Object.values(size.measurements), [null, null, null]);
    for (const color of colorways) {
      assert.equal(product.images[color.id].length, 3);
      assert.ok(product.images[color.id].every((image) => image.alt && image.id && image.src === null));
    }
  }
  assert.equal(getProduct("not-a-product"), undefined);
});
