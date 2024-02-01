let ENDPOINT = "";
if (process.env.NODE_ENV === "production") {
  ENDPOINT = "https://todo-production-9b6b.up.railway.app";
} else if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://localhost:3001";
}

export default ENDPOINT;