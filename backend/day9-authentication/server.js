import app from "./src/app.js";
import dotenc from "dotenv";

let port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
