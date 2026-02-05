const safeParse = (value, fallback) => {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch (err) {
    return fallback;
  }
};

module.exports = safeParse;