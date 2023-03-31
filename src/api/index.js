import api from "./interceptor";

export const signIn = (formData) => {
  let postData = {
    username: formData.username,
    password: formData.password,
  };

  return api.post("/login", postData);
};