import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { AppLoading, Font } from "expo";
import { API_KEY } from "react-native-dotenv";
import SvgUri from "react-native-svg-uri";

const Clarifai = require("clarifai");

export default class DetectorScreen extends Component {
  state = {
    fontLoaded: false,
    isDetecting: false,
    clarifaiAPI: null
  };

  componentWillMount() {
    (async () => {
      await Font.loadAsync({
        varela: require("../assets/fonts/VarelaRound-Regular.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  }

  redo = () => {
    this.props.navigation.navigate("Camera");
  };

  confirm = () => {
    const clarifaiAPI = new Clarifai.App({
      apiKey: API_KEY
    });

    // Issue with React Native
    // https://github.com/Clarifai/clarifai-javascript#react-native
    process.nextTick = setImmediate;

    const base64 = this.props.photo.base64;

    this.setState({ isDetecting: true });

    clarifaiAPI.models
      .predict(Clarifai.FOOD_MODEL, {
        base64
      })
      .then((response, error) => {
        const guesses = response.outputs[0].data.concepts;

        // Search for sandwich and if value is > 90% then success!
        const isSammich = guesses.filter(guess => {
          return guess.name === "sandwich" && guess.value >= 0.9;
        }).length;

        this.props.navigation.navigate("Results", {
          isSammich,
          photo: this.props.photo
        });

        this.setState({
          isDetecting: false
        });
      })
      .catch(error => {
        Alert.alert(
          "Sammich Fail",
          "My sammich detector skills are failing me :(",
          [
            {
              text: "Try Again",
              onPress: this.redo
            }
          ]
        );
      });
  };

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    const uri = this.props.photo.uri;

    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} />
        {this.state.isDetecting ? (
          <View style={styles.loadingContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/loading.gif")}
            />
            <Text style={{ fontFamily: "varela" }}>Hmm let me see ...</Text>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={this.confirm}
              underlayColor="white"
              style={styles.buttonWrapper}
            >
              <View style={styles.confirmButton}>
                <SvgUri
                  width="45"
                  height="45"
                  source={require("../assets/checkmark-white.svg")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.redo}
              underlayColor="white"
              style={styles.buttonWrapper}
            >
              <View style={styles.retryButton}>
                <SvgUri
                  width="45"
                  height="45"
                  source={require("../assets/redo-white.svg")}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  image: {
    flex: 3
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around"
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center"
  },
  buttonWrapper: {
    width: "36%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  confirmButton: {
    alignItems: "center",
    backgroundColor: "#4BB543",
    borderRadius: 5,
    padding: 12,
    paddingLeft: 32,
    paddingRight: 32
  },
  retryButton: {
    alignItems: "center",
    backgroundColor: "#a94442",
    borderRadius: 5,
    padding: 12,
    paddingLeft: 32,
    paddingRight: 32
  }
});
