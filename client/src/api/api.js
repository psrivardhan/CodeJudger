import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({ baseURL: "http://localhost:49160/api" });

export const signIn = (form) => API.post("/user/signin", form);
export const signUp = (form) => API.post("/user/signup", form);
export const signOut = () => API.get("/user/signout");
export const updateUser = (form) => API.post("/user/update", form);
export const getUserInfo = () => API.get("/user/info");
export const getUserProfile = (id) => API.get(`/user/${id}`);

export const getProblemInfo = (id) => API.get(`/problems/${id}`);
export const getProblems = (data) =>
  API.get(
    `/problems?page=${data.page}&min=${data.minScore}&max=${data.maxScore}`
  );
export const createProblem = (form) => API.post(`/problems/create`, form);
export const getProblemSubmissions = (id) =>
  API.get(`/problems/${id}/submissions`);
export const submitCodeForVerdict = (id, form) =>
  API.post(`/problems/${id}/submit`, form);
export const getSubmission = (id) => API.get(`/submissions/${id}`);
