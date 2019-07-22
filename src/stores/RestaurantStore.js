import { values } from "mobx";
import { flow, types } from "mobx-state-tree";
import { getRestaurants } from "../services/api";
import RestaurantModel from "./models/RestaurantModel";

const RestaurantStore = types
  .model("RestaurantStore", {
    restaurants: types.map(RestaurantModel),
    loading: false
  })
  .views(self => {
    return {
      getRestaurant: name => {
        return self.restaurants.get(name);
      },

      get restaurantList() {
        return values(self.restaurants);
      }
    };
  })
  .actions(self => ({
    loadRestaurants: flow(function*() {
      try {
        self.loading = true;
        const { restaurants } = yield getRestaurants();

        restaurants.forEach(restaurant => {
          self.restaurants.put(restaurant);
        });
      } catch (error) {
        console.warn(error.message);
      } finally {
        self.loading = false;
      }
    })
  }));

export default RestaurantStore;
window.RestaurantStore = RestaurantStore;
