import React, { useState, useRef } from "react";
import { TextInput } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

export default function Example() {
  const swiper = useRef<Swiper>(null);
  const contentSwiper = useRef<Swiper>(null);
  const [week, setWeek] = useState(0);

  const [value, setValue] = useState(new Date());

  /**
   * Create an array of weekdays for previous, current, and next weeks.
   */
  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  /**
   * Create an array of days for yesterday, today, and tomorrow.
   */
  const days = React.useMemo(() => {
    return [
      moment(value).subtract(1, "day").toDate(),
      value,
      moment(value).add(1, "day").toDate(),
    ];
  }, [value]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.container, { backgroundColor: "#fff" }]}>
              <View
                style={[
                  styles.header,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <View>
                  <Text style={styles.greeting}>Good morning</Text>
                  <Text style={styles.name}>Adharv</Text>
                </View>
                <View style={styles.profileImageWrapper}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=12" }} // you can replace this URL with your image
                    style={styles.profileImage}
                  />
                </View>
              </View>

              <View style={styles.picker}>
                <Swiper
                  index={1}
                  ref={swiper}
                  loop={false}
                  showsPagination={false}
                  onIndexChanged={(ind) => {
                    if (ind === 1) {
                      return;
                    }

                    const index = ind - 1;
                    setValue(moment(value).add(index, "week").toDate());

                    setTimeout(() => {
                      setWeek(week + index);
                      swiper.current?.scrollTo(1, false);
                    }, 10);
                  }}
                >
                  {weeks.map((dates, index) => (
                    <View style={styles.itemRow} key={index}>
                      {dates.map((item, dateIndex) => {
                        const isActive =
                          value.toDateString() === item.date.toDateString();
                        return (
                          <TouchableWithoutFeedback
                            key={dateIndex}
                            onPress={() => setValue(item.date)}
                          >
                            <View
                              style={[
                                styles.item,
                                isActive && {
                                  backgroundColor: "#bba5f0",
                                  borderColor: "#bba5f0",
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.itemWeekday,
                                  isActive && { color: "#fff" },
                                ]}
                              >
                                {item.weekday}
                              </Text>
                              <Text
                                style={[
                                  styles.itemDate,
                                  isActive && { color: "#fff" },
                                ]}
                              >
                                {item.date.getDate()}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      })}
                    </View>
                  ))}
                </Swiper>
              </View>

              <Swiper
                index={1}
                ref={contentSwiper}
                loop={false}
                showsPagination={false}
                onIndexChanged={(ind) => {
                  if (ind === 1) {
                    return;
                  }

                  setTimeout(() => {
                    const nextValue = moment(value).add(ind - 1, "days");

                    // Adjust week picker if needed
                    if (moment(value).week() !== nextValue.week()) {
                      setWeek(
                        moment(value).isBefore(nextValue) ? week + 1 : week - 1
                      );
                    }

                    setValue(nextValue.toDate());
                    contentSwiper.current?.scrollTo(1, false);
                  }, 10);
                }}
              >
                {days.map((day, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                    >
                      <Text style={styles.subtitle}>
                        {day.toLocaleDateString("en-US", { dateStyle: "full" })}
                      </Text>

                      <TextInput
                        style={styles.largeTextInput}
                        placeholder="Write your notes or event details here..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={6}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          // handle add event
                        }}
                        style={{ marginTop: 16 }}
                      >
                        <View style={styles.btn}>
                          <Text style={styles.btnText}>Add Event</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </Swiper>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    position: "relative",
  },
  header: {
    paddingHorizontal: 16,
  },
  profileImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 10,
    backgroundColor: "#eee",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#723FEB",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#723FEB",
    marginTop: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#723FEB",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#723FEB",
    marginBottom: 12,
  },
  footer: {
    position: "absolute",
    top: "70%",
    width: "100%",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  largeTextInput: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top", // important for Android multiline
    color: "#111",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#723FEB",
    borderColor: "#723FEB",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
