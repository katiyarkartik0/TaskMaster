let ENDPOINT = "";
if (process.env.NODE_ENV === "production") {
  ENDPOINT = "https://taskmaster-oygs.onrender.com";
} else if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://localhost:3001";
}

export default ENDPOINT;