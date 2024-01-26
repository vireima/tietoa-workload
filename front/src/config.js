const prod = {
  API_URL: "http://tietoa.up.railway.app",
  // API_URL_USERS: "http://tietoa.up.railway.app/users",
};

const dev = {
  API_URL: "http://localhost:8000",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
