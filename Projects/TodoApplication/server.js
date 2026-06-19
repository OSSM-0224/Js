import cerateApp from "./src/app.js";

const app = cerateApp();
const PORT = 3000;

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}

startServer();
