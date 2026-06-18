import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-project-d2bz.onrender.com/api/"
});

export const getTutorials = async () => API.get("/tutorial");
export const getTutorialById = async (id) => API.get(`/tutorial/${id}`);
export const addTutorial = async (token, data) =>
  await API.post("/tutorial", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  export const createBlog = async (token, data) =>
  await API.post("/blog", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getBlogs = async () =>
  await API.get("/blog");
