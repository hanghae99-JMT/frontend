import axios from "axios";

const JMTinstance = axios.create({
  baseURL: "https://1c2b-59-24-129-68.jp.ngrok.io/api",
});

axios.defaults.headers.common[`Authorization`] = 'value'

JMTinstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const _conf = {
      ...config,
      headers: {
        'Authorization': `${token}`,
      },
    };
    return _conf;
  } else {
    return config;
  }
}, (e) => {
    return Promise.reject(e)
});

const JMTapis = {
  loginUser: (user) => JMTinstance.post("/signin", {id: user.id, pw: user.pw}),
  loginCheck: (token) => JMTinstance.get("/user/token"),
  emailCheck: (id) => JMTinstance.get(`/users/${id}`),
  signUp: (userdata) => JMTinstance.post("/signup", userdata),
  getRanking: () => JMTinstance.get("/ranking"),
  searchRestaurant: (searchData) =>
    JMTinstance.get(
      `/search?keyword=${searchData.keyword}&x=${searchData.x}&y=${searchData.y}&page=${searchData.page}`
    ),
  addLike: (restaurant) => JMTinstance.post("/like", restaurant),
  getReviews: (rid) => JMTinstance.get(`/review?rid=${rid}`),
  postReviews: (reviewData) => JMTinstance.post("/review", reviewData),
  myLikes: (id) => JMTinstance.get(`/user/${id}/likes`),
  myReviews: (id) => JMTinstance.get(`/user/${id}/review`)
};

export default JMTapis;
