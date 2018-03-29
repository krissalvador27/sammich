import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { AppLoading, Font } from "expo";
import SvgUri from "react-native-svg-uri";

export default class HomeScreen extends React.Component {
  state = { isReady: false };

  componentWillMount() {
    (async () => {
      await Font.loadAsync({
        varela: require("../assets/fonts/VarelaRound-Regular.ttf")
      });
      this.setState({ isReady: true });
    })();
  }

  onPressButton = () => {
    this.props.navigation.navigate("Camera");
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../assets/sandwich.png")}
            style={styles.sammich}
          />
          <TouchableHighlight
            onPress={this.onPressButton}
            underlayColor="white"
            style={styles.buttonWrapper}
          >
            <View style={styles.button}>
              <SvgUri
                width="45"
                height="45"
                source={require("../assets/camera.svg")}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sammich: {
    height: 225,
    width: 225
  },
  container: {
    flex: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    marginTop: 60
  },
  button: {
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 12,
    paddingLeft: 32,
    paddingRight: 32,
    shadowColor: "orange"
  }
});
