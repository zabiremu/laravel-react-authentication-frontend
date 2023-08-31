import axios from "axios";
// axios restApi create method
export default axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
