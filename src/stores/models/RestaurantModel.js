import { types } from "mobx-state-tree";

const LocationModel = types.model("LocationModel", {
  address: types.maybe(types.string),
  crossStreet: types.maybe(types.string),
  lat: types.maybe(types.number),
  lng: types.maybe(types.number),
  postalCode: types.maybe(types.string),
  cc: types.maybe(types.string),
  city: types.maybe(types.string),
  state: types.maybe(types.string),
  country: types.maybe(types.string),
  formattedAddress: types.frozen()
});

const ContactModel = types.model("ContactModel", {
  phone: types.maybe(types.string),
  formattedPhone: types.maybe(types.string),
  twitter: types.maybe(types.string),
  facebook: types.maybe(types.string),
  facebookUsername: types.maybe(types.string),
  facebookName: types.maybe(types.string)
});

const RestaurantModel = types.model("RestaurantModel", {
  name: types.identifier,
  backgroundImageURL: "",
  category: "",
  contact: types.maybeNull(ContactModel),
  location: types.maybeNull(LocationModel)
});

export default RestaurantModel;
