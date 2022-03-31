import { config } from "dotenv";

config();

const { PORT } = process.env;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;

export default { PORT, MONGODB_URI };
