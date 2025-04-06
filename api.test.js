import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

describe("GET /posts (усі пости)", () => {
  test("отримуємо 100 записів", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(100);
  });

  test("перший пост має id = 1", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.data[0]).toHaveProperty("id", 1);
  });

  test("усі пости мають заголовки", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.data.every((post) => post.title)).toBe(true);
  });

  test("усі пости мають тіла", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.data.every((post) => post.body)).toBe(true);
  });

  test("усі пости мають userId", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.data.every((post) => post.userId)).toBe(true);
  });
});

describe("GET /posts/:id (один пост)", () => {
  test("отримати пост з id = 1", async () => {
    const response = await axios.get(`${BASE_URL}/1`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test("пост з id = 1 має правильний userId", async () => {
    const response = await axios.get(`${BASE_URL}/1`);
    expect(response.data.userId).toBe(1);
  });

  test("пост з id = 1 має заголовок", async () => {
    const response = await axios.get(`${BASE_URL}/1`);
    expect(response.data.title).toBeDefined();
  });

  test("пост з id = 999 не існує (очікується 404)", async () => {
    try {
      await axios.get(`${BASE_URL}/999`);
      throw new Error("Запит має кинути помилку 404");
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("пост з id = 150 не існує (очікується 404)", async () => {
    try {
      await axios.get(`${BASE_URL}/150`);
      throw new Error("Запит має кинути помилку 404");
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("POST /posts", () => {
  test("створення нового поста", async () => {
    const post = { title: "Новий пост", body: "Контент", userId: 1 };
    const response = await axios.post(BASE_URL, post);
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject(post);
  });

  test("створення поста без body", async () => {
    const post = { title: "Без body", userId: 2 };
    const response = await axios.post(BASE_URL, post);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("title");
  });

  test("створення поста з числовим title", async () => {
    const post = { title: 123, body: "Цифра у заголовку", userId: 3 };
    const response = await axios.post(BASE_URL, post);
    expect(response.status).toBe(201);
    expect(typeof response.data.title).toBe("number");
  });

  test("створення пустого поста", async () => {
    const response = await axios.post(BASE_URL, {});
    expect(response.status).toBe(201);
  });

  test("створення з зайвими полями", async () => {
    const post = { title: "ok", extra: "ігноруватись", userId: 4 };
    const response = await axios.post(BASE_URL, post);
    expect(response.status).toBe(201);
    expect(response.data.title).toBe("ok");
  });
});

describe("PUT /posts/:id", () => {
  test("оновлення поста", async () => {
    const updatedPost = { title: "Оновлено", body: "новий текст", userId: 1 };
    const response = await axios.put(`${BASE_URL}/1`, updatedPost);
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(updatedPost);
  });

  test("оновлення тільки заголовка", async () => {
    const response = await axios.put(`${BASE_URL}/1`, { title: "Заголовок" });
    expect(response.status).toBe(200);
    expect(response.data.title).toBe("Заголовок");
  });

  test("оновлення з пустим тілом", async () => {
    const response = await axios.put(`${BASE_URL}/1`, {});
    expect(response.status).toBe(200);
  });

  test("оновлення неіснуючого поста (очікується 500)", async () => {
    try {
      await axios.put(`${BASE_URL}/999`, { title: "Немає" });
      throw new Error("Запит має кинути помилку 500");
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });

  test("оновлення з невалідним userId", async () => {
    const response = await axios.put(`${BASE_URL}/1`, { userId: "abc" });
    expect(response.status).toBe(200);
  });
});

describe("DELETE /posts/:id", () => {
  test("видалення існуючого поста", async () => {
    const response = await axios.delete(`${BASE_URL}/1`);
    expect(response.status).toBe(200);
  });

  test("повторне видалення того ж поста", async () => {
    const response = await axios.delete(`${BASE_URL}/1`);
    expect(response.status).toBe(200);
  });

  test("видалення неіснуючого поста", async () => {
    const response = await axios.delete(`${BASE_URL}/9999`);
    expect(response.status).toBe(200);
  });

  test("видалення без id (помилка)", async () => {
    try {
      await axios.delete(`${BASE_URL}/`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("видалення з невалідним id", async () => {
    const response = await axios.delete(`${BASE_URL}/abc`);
    expect(response.status).toBe(200);
  });
});
