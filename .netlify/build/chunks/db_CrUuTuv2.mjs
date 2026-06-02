import { getStore } from '@netlify/blobs';
import { products } from './products_BP3GvgAQ.mjs';
import fs from 'node:fs';
import path from 'node:path';

const PRODUCTS_STORE_NAME = "products";
const IMAGES_STORE_NAME = "product-images";
const DATA_DIR = path.resolve("src/data");
const PRODUCTS_JSON_PATH = path.join(DATA_DIR, "products_db.json");
const UPLOADS_DIR = path.resolve("public/images/uploads");
function ensureLocalDirs() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}
async function getProducts() {
  {
    try {
      const store = getStore(PRODUCTS_STORE_NAME);
      let products$1 = await store.get("products", { type: "json" });
      if (products$1 && Array.isArray(products$1)) {
        return products$1;
      }
      const initial = [...products];
      await store.setJSON("products", initial);
      return initial;
    } catch (e) {
      console.error("Failed to retrieve products from Netlify Blobs:", e);
      return [...products];
    }
  }
  ensureLocalDirs();
  if (fs.existsSync(PRODUCTS_JSON_PATH)) {
    try {
      const data = fs.readFileSync(PRODUCTS_JSON_PATH, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to read local products_db.json:", e);
    }
  }
  try {
    fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write initial products to local storage:", e);
  }
  return [...products];
}
async function saveProducts(products) {
  {
    try {
      const store = getStore(PRODUCTS_STORE_NAME);
      await store.setJSON("products", products);
      return;
    } catch (e) {
      console.error("Failed to save products to Netlify Blobs:", e);
      throw new Error("Failed to save products to database");
    }
  }
  ensureLocalDirs();
  try {
    fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save products locally:", e);
    throw new Error("Failed to save products locally");
  }
}
async function saveUploadedImage(filename, buffer, contentType) {
  {
    try {
      const store = getStore(IMAGES_STORE_NAME);
      await store.set(filename, buffer, {
        metadata: {
          contentType,
          originalName: filename
        }
      });
      return;
    } catch (e) {
      console.error("Failed to upload image to Netlify Blobs:", e);
      throw new Error("Failed to upload image to database");
    }
  }
  ensureLocalDirs();
  const filePath = path.join(UPLOADS_DIR, filename);
  try {
    fs.writeFileSync(filePath, Buffer.from(buffer));
  } catch (e) {
    console.error("Failed to save image locally:", e);
    throw new Error("Failed to save image locally");
  }
}
async function getUploadedImage(filename) {
  {
    try {
      const store = getStore(IMAGES_STORE_NAME);
      const result = await store.getWithMetadata(filename, { type: "arrayBuffer" });
      if (result && result.data) {
        const contentType = result.metadata?.metadata?.contentType || "image/jpeg";
        return {
          data: result.data,
          contentType
        };
      }
      return null;
    } catch (e) {
      console.error("Failed to get image from Netlify Blobs:", e);
      return null;
    }
  }
  ensureLocalDirs();
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath);
      let contentType = "image/jpeg";
      const ext = path.extname(filename).toLowerCase();
      if (ext === ".png") contentType = "image/png";
      else if (ext === ".gif") contentType = "image/gif";
      else if (ext === ".svg") contentType = "image/svg+xml";
      else if (ext === ".webp") contentType = "image/webp";
      return {
        data: data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength),
        contentType
      };
    } catch (e) {
      console.error("Failed to read image locally:", e);
    }
  }
  return null;
}

export { getUploadedImage as a, saveUploadedImage as b, getProducts as g, saveProducts as s };
