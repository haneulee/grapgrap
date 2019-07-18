import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const PhotoActions = props => (
  <View style={styles.container}>
    <View style={styles.actions}>
      <TouchableOpacity onPressOut={props.handlePress}>
        <View style={styles.action}>
          <Ionicons
            name={props.isLiked ? "md-heart" : "md-heart-empty"}
            size={30}
            color={props.isLiked ? "#eb4b59" : "black"}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPressOut={() => props.navigation.navigate("Comments")}
      >
        <View style={styles.action}>
          <FontAwesome name={"comment-o"} size={30} color={"black"} />
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPressOut={() => props.navigation.navigate("Likes")}>
      <View>
        <Text style={styles.likes}>
          {props.likeCount} {props.likeCount === 1 ? "like" : "likes"}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: "row"
  },
  action: {
    marginRight: 10
  },
  likes: {
    fontWeight: "600",
    fontSize: 14
  }
});

PhotoActions.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired
};

export default withNavigation(PhotoActions);
