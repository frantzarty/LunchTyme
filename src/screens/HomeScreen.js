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

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Lunch Tyme",
      headerBackTitle: null,
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

    stores.restaurantStore.loadRestaurants();
  }

  _keyExtractor = (item, index) => item.name;

  _renderItem = (restaurant, navigation) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push("Detail", { restaurant });
        }}
      >
        <ImageBackground
          key={restaurant.name}
          source={{ uri: restaurant.backgroundImageURL }}
          style={styles.imageBackground}
        >
          <Image source={GRADIENT} style={styles.gradient} />
          <Text style={styles.nameText}>{restaurant.name}</Text>
          <Text style={styles.categoryText}>{restaurant.category}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={stores.restaurantStore.restaurantList}
          // Extract this function into a seperate component
          renderItem={({ item }) => this._renderItem(item, navigation)}
          keyExtractor={this._keyExtractor}
          refreshing={stores.restaurantStore.loading}
          onRefresh={() => stores.yoursSessionStore.loadRestaurants()}
          onEndReached={info => {
            if (
              info.distanceFromEnd >= -10 &&
              !stores.restaurantStore.loading
            ) {
              stores.restaurantStore.loadRestaurants();
            }
          }}
          ListEmptyComponent={this._listEmptyComponent}
          contentContainerStyle={{ flexGrow: 1 }}
        />
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
  nameText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "AvenirNextLTPro-Demi",
    marginLeft: 12,
    marginBottom: 6,
    fontWeight: "bold"
  },
  categoryText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "AvenirNextLTPro-Regular",
    marginLeft: 12,
    marginBottom: 6
  },
  gradient: {
    width: "100%",
    height: 180,
    position: "absolute"
  },
  imageBackground: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  }
});

export default observer(HomeScreen);
