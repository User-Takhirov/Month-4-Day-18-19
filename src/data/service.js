const urlall = "https://product-feedback-data.vercel.app/all";
const urlCotegory = "https://product-feedback-data.vercel.app/category";
const urlTab = "https://product-feedback-data.vercel.app";

export const category = async () => {
  try {
    const res = await fetch(`${urlCotegory}`);
    const data = res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const render = async (item) => {
  try {
    const res = await fetch(`${urlTab}/${item || "all"}`);
    const data = res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const search = async (value) => {
  try {
    const res = await fetch(`${urlall}?title_like=${value}`);
    const data = await res.json();
    if (data.length == 0) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    return error.message;
  }
};
