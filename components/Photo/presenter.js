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
import FadeIn from "react-native-fade-in-image";

const { width, height } = Dimensions.get("window");

const Photo = props => (
  <View style={styles.photo}>
    <TouchableOpacity>
      <View style={styles.header}>
        <FadeIn>
          <Image
            source={
              props.creator.profile_image
                ? { uri: props.creator.profile_image }
                : require("../../assets/images/noPhoto.jpg")
            }
            style={styles.avatar}
          />
        </FadeIn>
        <View>
          <View>
            <Text style={styles.author}>{props.creator.username}</Text>
            {props.location && (
              <Text style={styles.location}>{props.location}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
    <FadeIn>
      <Image
        style={{ width, height: props.is_vertical ? 600 : 300 }}
        source={
          props.file
            ? { uri: props.file }
            : require("../../assets/images/noPhoto.jpg")
        }
      />
    </FadeIn>
    <View style={styles.photoMeta}>
      <View style={styles.comment}>
        <Text style={styles.commentAuthor}>
          {props.creator.username}{" "}
          <Text style={styles.message}>{props.caption}</Text>
        </Text>
      </View>
      {props.comments.length > 0 && (
        <View style={styles.comment}>
          <TouchableOpacity>
            <View style={styles.commentsLink}>
              {props.comments.length === 1 ? (
                <Text style={styles.linkText}>View 1 comment</Text>
              ) : (
                <Text style={styles.linkText}>
                  View all {props.comments.length} comments
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Text>{props.natural_time}</Text>
    </View>
  </View>
);

Photo.propTypes = {
  caption: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  like_count: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  natural_time: PropTypes.string,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    image: PropTypes.string
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        image: PropTypes.string
      }).isRequired,
      message: PropTypes.string.isRequired
    })
  ).isRequired,
  is_liked: PropTypes.bool.isRequired,
  is_vertical: PropTypes.bool.isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      profile_image: PropTypes.string,
      username: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  )
};

const styles = StyleSheet.create({
  photo: {
    width,
    marginBottom: 10
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  author: {
    fontWeight: "600",
    marginBottom: 3,
    fontSize: 15
  },
  location: {
    fontSize: 13
  },
  photoMeta: {
    paddingHorizontal: 15
  },
  comment: {
    marginTop: 5
  },
  commentAuthor: {
    marginRight: 5,
    fontWeight: "600",
    fontSize: 14
  },
  message: {
    fontWeight: "400",
    fontSize: 15
  },
  commentsLink: {
    marginTop: 5
  },
  linkText: {
    fontSize: 15,
    color: "#999"
  },
  dateText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5
  }
});

export default Photo;
