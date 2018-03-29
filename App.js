import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./components/Home";
import CameraScreen from "./components/Camera";
import DetectorScreen from "./components/Detector";
import ResultsScreen from "./components/Results";

const mapNavigationParamsToProps = SomeComponent => {
  return class extends React.Component {
    render() {
      const { navigation, ...otherProps } = this.props;

      // Unpack navigation params to send as props
      const { state: { params } } = navigation;

      return <SomeComponent {...this.props} {...params} />;
    }
  };
};

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Camera: {
      screen: CameraScreen
    },
    Detector: {
      screen: mapNavigationParamsToProps(DetectorScreen)
    },
    Results: {
      screen: mapNavigationParamsToProps(ResultsScreen)
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
