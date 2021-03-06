import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notification from "expo-notifications";
import * as Permission from "expo-permissions";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

export default class App extends React.Component {
  componentDidMount() {
    Permission.getAsync(Permission.NOTIFICATIONS)
      .then((response) => {
        if (response.status !== "granted") {
          return Permission.askAsync(Permission.NOTIFICATIONS);
        }
        return response;
      })
      .then((response) => {
        if (response.status !== "granted") {
          return;
        }
      });
  }

  handleNotification = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "🎊 Login Successfully 🎊 ",
        body: "Thank you for logging into our app.",
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"Get A Notification"}
          onPress={this.handleNotification}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
