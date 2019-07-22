import { observer } from "mobx-react";
import React, { Component } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { GRADIENT, MAP } from "../constants/images";
import stores from "../stores";
import MapView, { Marker } from "react-native-maps";

class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const restaurant = navigation.getParam("restaurant", {});
    return {
      title: "Lunch Tyme",

      headerStyle: {
        backgroundColor: "#43E895",
        border: 0
      },
      headerTitleStyle: {
        fontSize: 17,
        fontFamily: "AvenirNextLTPro-Demi"
      },
      headerTintColor: "white",

      headerRight: (
        <TouchableOpacity
          style={{ padding: 8, alignItems: "center", justifyContent: "center" }}
          onPress={() => {}}
        >
          <Image source={MAP} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const restaurant = navigation.getParam("restaurant", {});
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: restaurant.location.lat,
            longitude: restaurant.location.lng,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }}
        >
          <Marker
            coordinate={{
              latitude: restaurant.location.lat,
              longitude: restaurant.location.lng
            }}
            title={restaurant.name}
          />
        </MapView>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{restaurant.name}</Text>
          <Text style={styles.categoryText}>{restaurant.category}</Text>
        </View>
        <View style={styles.contactContainer}>
          {!!restaurant.location && (
            <Text style={styles.contactText}>
              {restaurant.location.address}
              {"\n"}
              {restaurant.location.city}, {restaurant.location.state}{" "}
              {restaurant.location.postalCode}
            </Text>
          )}
          {!!restaurant.contact && (
            <>
              {!!restaurant.contact.formattedPhone && (
                <Text style={styles.contactText}>
                  {restaurant.contact.formattedPhone}
                </Text>
              )}
              {!!restaurant.contact.twitter && (
                <Text style={styles.contactText}>
                  @{restaurant.contact.twitter}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  map: {
    width: "100%",
    height: 180
  },
  textContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#43E895",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 12
  },
  contactContainer: {
    width: "100%",

    justifyContent: "center",
    alignItems: "flex-start",
    padding: 12
  },
  contactText: {
    fontSize: 16,
    color: "#2a2a2a",
    fontFamily: "AvenirNextLTPro-Regular",

    marginBottom: 26
  },
  nameText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "AvenirNextLTPro-Demi",

    marginBottom: 6,
    fontWeight: "bold"
  },
  categoryText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "AvenirNextLTPro-Regular"
  }
});

export default observer(DetailScreen);
