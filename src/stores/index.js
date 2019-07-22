import RestaurantStore from "./RestaurantStore";

let _restaurantStore;

export const resetAll = () => {
  _restaurantStore = RestaurantStore.create({});
};

resetAll();

const stores = {
  restaurantStore: _restaurantStore
};

export default stores;
window.stores = stores;
