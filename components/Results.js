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

export default class ResultsScreen extends React.Component {
  state = { fontLoaded: false };

  componentWillMount() {
    (async () => {
      await Font.loadAsync({
        varela: require("../assets/fonts/VarelaRound-Regular.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  }

  returnHome = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    const uri = this.props.photo.uri;

    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} />
        <View style={styles.resultsContainer}>
          {this.props.isSammich ? (
            <Text onPress={this.returnHome} style={styles.resultText}>
              It's a sammich!
            </Text>
          ) : (
            <Text onPress={this.returnHome} style={styles.resultText}>
              That's not a sammich
            </Text>
          )}
        </View>
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
    flex: 3,
    padding: 40
  },
  resultsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around"
  },
  resultText: {
    fontSize: 32,
    fontFamily: "varela"
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
