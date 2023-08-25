import { useRef } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { externalStyle } from "../../styles/externalStyle";
import colors from "../../config/colors";
import { WaveSvg } from "../../components/svg-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CAROUSEL_DATA } from "../../services/var.services";

const { width } = Dimensions.get("screen");

const Indicator = ({ scrollX, props, skipHandler }) => {
  return (
    <View style={styles.carousel.indicatorContainer}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {CAROUSEL_DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [colors.white, "black", colors.white],
          });

          return (
            <Animated.View
              key={`indicator-${i}`}
              style={[{ backgroundColor }, styles.carousel.indicatorItem]}
            />
          );
        })}
      </View>
      <TouchableOpacity onPress={() => skipHandler()}>
        <Text style={styles.carousel.skip_btn}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Carousel(props) {
  const skipHandler = async () => {
    try {
      await AsyncStorage.setItem("newUser", "true");
      props.navigation.navigate("login");
    } catch (e) {
      console.log("Warning set in Carousel.js: " + e);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar />
      <Animated.FlatList
        data={CAROUSEL_DATA}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item) => item.title}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={styles.carousel.mainContainer}>
              <View style={styles.carousel.upperView}>
                <Image source={item.image} style={styles.carousel.image} />
                <View style={styles.carousel.waveContainer}>
                  <WaveSvg />
                </View>
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={styles.carousel.title}>{item.title}</Text>
                <Text style={styles.carousel.description}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} props={props} skipHandler={skipHandler} />
    </View>
  );
}

const styles = StyleSheet.create(externalStyle);
