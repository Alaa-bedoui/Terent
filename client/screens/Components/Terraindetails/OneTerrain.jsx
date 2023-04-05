import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";
import { Image, ScrollView } from "react-native";
import { View, TextInput } from "react-native";
import { Surface, Text } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { Avatar, Button, Card } from "react-native-paper";
import AppointmentScheduler from "../../calander.jsx";
import Mapplayerpic from "../../../MAP/Mapplayerpic.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import config from "../../../config.js";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity, ToastAndroid } from "react-native";
import { Root } from "popup-ui";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";

import { KeyboardAvoidingView } from "react-native";
import { baseUrl } from "../../../urlConfig/urlConfig.js";
import { Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/FontAwesome";

import BottomNavigationBar from "../Bottomnav/BottomNav.jsx";
import SimpleLottie from "../animation.jsx";
const Items = [
  "https://scontent.ftun4-2.fna.fbcdn.net/v/t1.6435-9/120039052_3911095482240476_3445366842671929972_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_ohc=zk60fosX4K8AX-7EwG6&_nc_ht=scontent.ftun4-2.fna&oh=00_AfB6T9262o8O9TQjUlw_GfKy3mSVaGkBYw282zag0jbEHg&oe=644007B9",
  "https://scontent.ftun4-2.fna.fbcdn.net/v/t1.18169-9/11231022_1585673541686857_8706807765151836531_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=1j-ImmW9TFsAX8JwjZl&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBKvxC9EK8iDevdmv3dS2IEk-FjKNM3eq0AN1O1z0UxIg&oe=64401A89",
  "https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/299629475_2308236879351328_9082808578788546325_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=iJUbW4lHOAgAX-rxgOB&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBJHQH83LxwK2NWFVAC3-o3zFxAeESjoZpXGlFT7_Xlnw&oe=641D75EE",
  "https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/323406220_870041400994690_1115519738099513033_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=XpbjMgGzB2AAX_61Bj2&_nc_ht=scontent.ftun4-2.fna&oh=00_AfDgz2QXssIDZL4DzNH3XrIGGyoBc3RZb5aiBPAAimcY_A&oe=641DFFFD",
  "https://ca.slack-edge.com/T0483L108BH-U048BTQCR0F-c3ff1c875fe9-72",
];
const OneTerrain = ({ navigation, route }) => {
  const rednerItem = (pic, index) => (
    <View style={{ width: 90, marginTop: 50, top: -50 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("profileplayer");
        }}
      >
        <Avatar.Image source={{ uri: pic }} size={70}></Avatar.Image>
      </TouchableOpacity>
    </View>
  );
  const [review, setreview] = useState("");
  const [data, setdata] = useState([]);
  const [dataterrain, setdataterrain] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [seeReviews, setseeReviews] = useState(false);
  const [dataplayer, setdataplayer] = useState([]);
  const [write, setwrite] = useState(false);
  const [ratingValue, setRatingValue] = useState([]);
  const [average, setAverage] = useState(0);
  const numFilled = Math.floor(average);
  const hasHalf = average % 1 !== 0;
  const numEmpty = 5 - numFilled - (hasHalf ? 1 : 0);

  const dataimage = [
    {
      image: dataterrain.Img1,
    },
    {
      image: dataterrain.Img2,
    },
    {
      image: dataterrain.Img3,
    },
    {
      image: dataterrain.Img1,
    },
  ];
  const stars = [];
  for (let i = 0; i < numFilled; i++) {
    stars.push(<Icon key={i} name="star" />);
  }
  if (hasHalf) {
    stars.push(<Icon key={numFilled} name="star-half-o" />);
  }
  for (let i = 0; i < numEmpty; i++) {
    stars.push(<Icon key={numFilled + (hasHalf ? 1 : 0) + i} name="star-o" />);
  }

  const addReview = () => {
    axios.post(
      `${baseUrl}api/reviews/addreview/Rmt1HlADW2eRc82c7XG5srWLjUQ2/${route.params.id}`,
      {
        terrainId: route.params.id,
        Comments: review,
      }
    );
  };
  const showreview = () => {
    setseeReviews(true);
  };

  useEffect(() => {
    const getAllStars = () => {
      axios
        .get(`${baseUrl}api/reviews/getRating/${route.params.id}`)
        .then((res) => {
          const ratings = res.data;
          const filteredRatings = ratings.filter(
            (rating) => rating.Rating !== null
          );
          const totalRatings = filteredRatings.length;
          const sumRatings = filteredRatings.reduce((acc, rating) => {
            if (rating.Rating > 0) {
              return acc + rating.Rating;
            } else {
              return acc;
            }
          }, 0);
          const averageRating = sumRatings / totalRatings;
          setAverage(averageRating);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAllStars();
  }, [route.params.id]);
  const addStar = () => {
    axios
      .post(`${baseUrl}api/reviews/stars/Rmt1HlADW2eRc82c7XG5srWLjUQ2/1`, {
        Rating: ratingValue,
      })
      .then((response) => {
        console.log("Review added successfully!");
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}api/reviews/getreview/${route.params.id}`)
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.Comments !== null
        );
        setdata(filteredData);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${baseUrl}api/terrain/terrains/oneterrains/${route.params.id}`)
      .then((response) => {
        setdataterrain(response.data);
      })
      .catch((error) => console.error(error));
  }, [route.params.id, refresh]);

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      carouselRef.current?.snapToNext();
    }, 7000); // Change the time duration here for the slide rotation
    return () => clearInterval(timer);
  }, []);
  const renderData = [...dataimage, ...data.slice(0, 3)]; // add the first 3 images to the end to ensure all images are displayed

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image}></Image>
      </View>
    );
  };
  const showToast = () => {
    ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
  };
  const { width: screenWidth } = Dimensions.get("window");

  const onSnapToItem = (index) => {
    setCurrentIndex(index);
  };

  // const isReviewEmpty = review.trim().length === 0;
  return (
    <Root>
      <View style={{ backgroundColor: "black", height: "100%" }}>
        {data[0] ? (
          <KeyboardAvoidingView
            behavior="height"
            style={{ backgroundColor: "black" }}
          >
            <ScrollView
              style={{
                backgroundColor: "black",
                marginBottom: 50,
              }}
            >
              <Card
                style={{
                  marginTop: 0,

                  marginBottom: 40,
                  backgroundColor: "black",
                }}
              >
                <Carousel
                  ref={carouselRef}
                  data={renderData}
                  renderItem={renderItem}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth}
                  loop={true}
                  autoplay={true}
                  autoplayInterval={7000} // Change the time duration here for the slide rotation
                  onSnapToItem={onSnapToItem}
                  initialScrollIndex={currentIndex}
                  decelerationRate="normal" // Set the decelerationRate prop
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderBottomColor: "darkorange",
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "darkorange",
                      position: "absolute",
                      top: 10,
                      fontSize: 20,
                      left: 10,
                      textTransform: "capitalize",
                    }}
                  >
                    {dataterrain.Name}
                  </Text>

                  <Text
                    style={{
                      color: "darkorange",
                      position: "absolute",
                      top: 15,
                      left: 295,
                    }}
                  >
                    Price : {dataterrain.Price}
                  </Text>
                  <Text
                    style={{
                      color: "darkorange",
                      position: "absolute",
                      top: 15,
                      left: 150,
                      fontSize: 15,
                    }}
                  >
                    {dataterrain.Capacity}
                    <Ionicons
                      name="ios-people"
                      size={15}
                      color="darkorange"
                    ></Ionicons>
                  </Text>

                  <Text
                    style={{
                      marginLeft: 220,
                      fontSize: 15,
                      color: "darkorange",
                      top: 10,
                    }}
                    variant="headlineSmall"
                  >
                    {stars}
                  </Text>
                </View>
              </Card>

              <View>
                <Text
                  style={{
                    color: "white",
                    marginVertical: 20,
                    marginHorizontal: 10,
                    top: -20,
                  }}
                >
                  {dataterrain.Description}
                </Text>
              </View>
              <View
                pointerEvents="none"
                style={{ top: -20, marginHorizontal: 7.2, marginBottom: 20 }}
              >
                <Mapplayerpic />
              </View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  zIndex: 1,
                  marginBottom: 20,
                  top: -10,
                  paddingBottom: 10,
                  borderBottomColor: "darkorange",
                  borderBottomWidth: 1,
                }}
              >
                Available players
              </Text>
              <HorizontalPicker
                data={Items}
                renderItem={rednerItem}
                snapToInterval={40}
                itemWidth={100}
              />

              <View>
                <TouchableOpacity
                  style={{
                    top: -310,
                    height: 40,

                    width: 40,
                    backgroundColor: "black",
                    borderWidth: 0.5,
                    borderRadius: 8,
                    alignItems: "center",

                    left: 7.2,

                    position: "absolute",
                    borderColor: "darkorange",
                  }}
                  onPress={() => {
                    navigation.navigate("Mapplayer");
                  }}
                >
                  <Text style={{ color: "darkorange", marginTop: 7 }}>
                    <Ionicons name="compass-outline" size={20}></Ionicons>
                  </Text>
                </TouchableOpacity>
              </View>
              <AppointmentScheduler />
              <TouchableOpacity
                onPress={(e) => {
                  showreview();
                  setseeReviews(!seeReviews);
                }}
                style={{
                  backgroundColor: "black",
                  borderWidth: 0.5,

                  alignItems: "center",
                  marginBottom: 40,
                  marginTop: 10,
                  left: 0,
                  top: 0,

                  borderBottomColor: "darkorange",
                }}
              >
                <Text style={{ color: "white", fontSize: 15, top: 5 }}>
                  {seeReviews
                    ? "Hide players reviews"
                    : "Press to see Players Reviews"}
                </Text>
                <Ionicons
                  name={seeReviews ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="white"
                  style={{ top: -15, left: 120 }}
                ></Ionicons>
              </TouchableOpacity>
              {seeReviews && (
                <View>
                  {data.map((item) => (
                    <Card
                      style={{
                        marginTop: -30,
                        marginHorizontal: 10,
                        borderRadius: 60,
                        backgroundColor: "transparent",
                        borderColor: "darkorange",
                        borderWidth: 2,
                        marginBottom: 50,
                      }}
                    >
                      <Avatar.Image
                        size={40}
                        style={{
                          marginTop: 10,
                          marginLeft: 45,
                          backgroundColor: "black",
                        }}
                        source={{
                          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                        }}
                      />

                      <Text
                        style={{
                          top: -35,
                          marginLeft: 90,
                          fontSize: 20,
                          textTransform: "capitalize",
                          color: "white",
                        }}
                      >
                        {dataplayer.FirstName}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          top: -55,
                          left: 100,
                          fontSize: 20,
                        }}
                      >
                        Anonymous.
                      </Text>

                      <Card.Content>
                        <Text
                          style={{
                            marginLeft: 20,
                            fontSize: 18,
                            top: -30,
                            left: 10,
                            paddingHorizontal: 10,
                            color: "white",
                          }}
                          variant="headlineSmall"
                        >
                          {item.Comments}.
                        </Text>
                      </Card.Content>
                    </Card>
                  ))}
                  <TouchableOpacity
                    onPress={() => {
                      setwrite(!write);
                    }}
                    style={{
                      backgroundColor: "black",
                      borderWidth: 0.5,
                      marginTop: -10,
                      alignItems: "center",
                      marginBottom: 44,
                      left: 0,

                      borderBottomColor: "darkorange",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 15, top: 5 }}>
                      Add Your Own Review
                    </Text>
                    <Ionicons
                      name="pencil-outline"
                      size={20}
                      color="white"
                      style={{ top: -15, left: 100 }}
                    ></Ionicons>
                  </TouchableOpacity>
                  {write && (
                    <View style={{ height: 150, marginBottom: 30 }}>
                      <TextInput
                        placeholder={"Write your review here"}
                        value={review}
                        style={{
                          textTransform: "capitalize",
                          textAlign: "center",
                          color: "darkorange",
                          fontSize: 15,
                        }}
                        placeholderTextColor="lightgrey"
                        onChangeText={(text) => setreview(text)}
                      />

                      <Button
                        style={{
                          marginVertical: 10,
                          borderBottomColor: "darkorange",
                          borderBottomWidth: 1,
                          borderRadius: 0,
                          width: 50,
                          left: 170,
                        }}
                        onPress={() => {
                          setrefresh(!refresh);
                          setreview(addReview());
                          addReview;
                        }}
                        textColor="darkorange"
                        // style={{ opacity: isReviewEmpty ? 0.5 : 1 }}
                      >
                        Post
                      </Button>
                      <Button
                        style={{
                          borderColor: "darkorange",
                          borderWidth: 1.5,
                          marginBottom: 0,
                          borderRadius: 15,
                          position: "absolute",
                          width: 10,
                          height: 40,
                          left: 330,
                          top: 67,
                        }}
                        title="Add Review"
                        onPress={addStar}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Save
                        </Text>
                      </Button>
                      <Rating
                        style={{ width: 20, height: 20, right: -190 }}
                        tintColor="black"
                        type="star"
                        startingValue={0}
                        ratingBackgroundColor={"darkorange"}
                        imageSize={40}
                        onFinishRating={setRatingValue}
                      />
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
            <View
              style={{
                position: "absolute",
                bottom: 60,
                flex: 1,
                alignSelf: "stretch",
                right: 0,
                left: 0,
              }}
            >
              <BottomNavigationBar />
            </View>
          </KeyboardAvoidingView>
        ) : (
          <Surface style={{ backgroundColor: "black", marginTop: 300 }}>
            <SimpleLottie />
          </Surface>
        )}
      </View>
    </Root>
  );
};
const styles = StyleSheet.create({
  slide: {
    backgroundColor: "transparent",
    height: 170,
  },
  image: {
    width: 430,
    height: 170,
    opacity: 0.9,
  },
});
export default OneTerrain;
