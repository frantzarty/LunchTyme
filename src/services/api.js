import axios from "../utils/axios";

export const getRestaurants = () => {
    return axios.get("BR_iOS_CodingExam_2015_Server/restaurants.json").then(response => {
        return response.data;
    });
};