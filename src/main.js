import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from "axios";
import auth from "./api/authApi.js";

Vue.config.productionTip = false
axios.defaults.withCredentials = true;


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      let code = error.response.data.code;

      if (code === "EXPIRED") {
        try {
          const accessToken = await auth.requestReissue();
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          return axios(originalRequest);
        } catch (reissueError) {
          window.location.href = "/";
          alert("권한이 없습니다. 다시 로그인 해주세요.");
        }
      }

      window.location.href = "/";
      alert("권한이 없습니다. 다시 로그인해주세요.");
    } else {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);


Vue.filter('getOrderStatusName', function (orderStatus) {
  switch (orderStatus) {
    case "PLACED":
      return "주문신청됨";
    case "ACCEPTED":
      return "주문수락됨";
    case "REJECTED":
      return "주문거절됨";
    case "WAITING":
      return "픽업대기중";
    case "FINISHED":
      return "픽업완료됨";
    case "FAILED":
      return "주문실패";
    default:
      return orderStatus;
  }
});

Vue.filter('currency', function (value) {
  let num = Number(value);
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
});
