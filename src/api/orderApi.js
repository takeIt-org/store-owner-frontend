import axios from "axios";

export default {
    requestPrevOrder(startDate, endDate, page) {
        const options = {
            params: {
                startDate: startDate,
                endDate: endDate,
                page: page
            }
        }
        return axios.get( "/order-service/api/owner/order/prev-order", options);
    },
    requestOrder(orderDate, lastOrderId) {
        const options = {
            params: {
                orderDate: orderDate,
                lastOrderId: lastOrderId
            }
        }
        return axios.get("/order-service/api/owner/order/order-main", options);
    },
    patchOrder(orderId, orderStatus) {
        const body = {
            orderStatus: orderStatus
        }
        return axios.patch("/order-service/order/" + orderId, body);
    },
    findDashboard(){
        return axios.get("/order-service/api/owner/order/dashboard");
    },
    getOrderDetail(orderId) {
        return axios.get("/order-service/api/order-detail/" + orderId);
    }
}
