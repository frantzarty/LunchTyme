import { observer } from "mobx-react";
import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
  Text
} from "react-native";
import { BACK, FORWARD, REFRESH } from "../constants/images";
import stores from "../stores";
import { WebView } from "react-native-webview";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const webview = navigation.getParam("webview", {});
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

      headerLeft: (
        <>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => {
              webview.goBack();
            }}
          >
            <Image source={BACK} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => {
              webview.reload();
            }}
          >
            <Image source={REFRESH} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => {
              webview.goForward();
            }}
          >
            <Image source={FORWARD} />
          </TouchableOpacity>
        </>
      )
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ webview: this.webview });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <WebView
          ref={ref => (this.webview = ref)}
          source={{ uri: "https://www.bottlerocketstudios.com" }}
          style={{ flex: 1 }}
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
  imageButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default observer(HomeScreen);
