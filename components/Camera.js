import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Camera, Permissions } from "expo";
import SvgUri from "react-native-svg-uri";

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    takingPicture: false
  };

  componentWillMount() {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: status === "granted"
      });
    })();
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPicture) {
      this.setState({ takingPicture: true });

      // Detector will need the photo in base64
      const photo = await this.camera.takePictureAsync({ base64: true });

      this.props.navigation.navigate("Detector", {
        photo
      });

      this.setState({
        takingPicture: false
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 12 }}
            type={this.state.type}
            autoFocus={Camera.Constants.AutoFocus.on}
          />
          <View
            style={{
              flex: 1.5,
              backgroundColor: "white",
              flexDirection: "column",
              alignContent: "flex-end",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableHighlight
              style={{
                flex: 1,
                alignItems: "center",
                width: 104,
                height: "100%"
              }}
              onPress={this.takePicture}
              underlayColor="transparent"
            >
              <View style={styles.button}>
                <SvgUri
                  width="40"
                  height="40"
                  source={require("../assets/camera.svg")}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    height: "100%",
    paddingLeft: 32,
    paddingRight: 32,
    shadowColor: "orange"
  }
});
