import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";
import { connect } from "react-redux";
import axios_config from "../../config/axios_config";
import { setVideos, setModules, setQuizzes } from "../../redux";
import { checkProfile, toastHandler } from "../../services/tools";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const ListTemplate = (props) => {
  const { backgroundColor, load, icon, width, title, addColor } = props.data;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({
    modal: false,
    item: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const refresHandler = async () => {
    setIsRefreshing(true);
    await load();
    setIsRefreshing(false);
  };
  const deleteHandler = async () => {
    const link =
      title == "Modules"
        ? "module/delete/"
        : title == "Videos"
        ? "video/delete/"
        : "quiz/delete/";
    const datas =
      title == "Modules"
        ? props?.modules
        : title == "Videos"
        ? props?.videos
        : props?.quizzes;
    setIsLoading(true);
    await axios_config
      .delete(link + deleteTarget.item?._id)
      .then((res) => {
        toastHandler({
          type: "success",
          text1: "Post has been deleted!",
          onShow: () => {
            let filter = datas?.filter(
              (pr) => pr._id != deleteTarget.item?._id
            );
            if (title == "Modules") {
              props.setModules(filter);
            } else if (title == "Videos") {
              props.setVideos(filter);
            } else {
              props.setQuizzes(filter);
            }
            setIsLoading(false);
          },
        });
      })
      .catch((e) => {
        console.log(e);
        toastHandler({ type: "error", text1: "Something went wrong!" });
        setIsLoading(false);
      });
  };
  const renderItem = ({ item }) => {
    let pic = checkProfile(item, props?.credentials);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          props.navigation.navigate({
            name: `${
              props.data?.type == "video"
                ? "view-video"
                : props.data?.type == "module"
                ? "view-module"
                : "view-quiz"
            }`,
            params: { item },
            merge: true,
          })
        }
      >
        <View
          style={{
            borderWidth: 0.7,
            borderColor: colors.lightgray,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "semibold",
              fontSize: 26,
            }}
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={pic}
              style={{
                borderRadius: 20,
                height: 20,
                width: 20,
                marginRight: 10,
              }}
            />
            <Text style={{ fontFamily: "regular", fontSize: 16 }}>
              {item.teacher_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  padding: 5,
                  fontSize: 14,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                  color: "white",
                  backgroundColor: colors.black,

                  fontFamily: "regular",
                }}
              >
                {item.category}
              </Text>
              {props?.credentials?._id == item?.teacher_id &&
                deleteTarget?.item?._id != item?._id && (
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        title == "Modules"
                          ? props.navigation.navigate({
                              name: "edit-module",
                              params: { item },
                              merge: true,
                            })
                          : title == "Videos"
                          ? props.navigation.navigate({
                              name: "edit-video",
                              params: { item },
                              merge: true,
                            })
                          : props.navigation.navigate({
                              name: "edit-quiz",
                              params: { item },
                              merge: true,
                            });
                      }}
                    >
                      <Text
                        style={{
                          padding: 5,
                          fontSize: 14,
                          paddingHorizontal: 10,
                          borderRadius: 20,
                          color: "white",
                          backgroundColor: colors.green,
                          fontFamily: "regular",
                        }}
                      >
                        Update
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setDeleteTarget({ modal: true, item });
                      }}
                    >
                      <Text
                        style={{
                          padding: 5,
                          fontSize: 14,
                          paddingHorizontal: 10,
                          borderRadius: 20,
                          color: "white",
                          backgroundColor: colors.red,
                          fontFamily: "regular",
                        }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          </View>

          {item?._id == deleteTarget.item?._id && (
            <View style={styles.deleteCard}>
              <Text style={styles.text}>
                Are you sure you want to delete "{deleteTarget?.item?.title}"?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!isLoading ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setDeleteTarget({ item: null, modal: false })
                      }
                    >
                      <Text
                        style={[
                          styles.button,
                          {
                            backgroundColor: colors.gray,
                          },
                        ]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteHandler}>
                      <Text
                        style={[
                          styles.button,
                          {
                            backgroundColor: colors.red,
                            borderWidth: 0,
                            color: "white",
                          },
                        ]}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text
                    style={[
                      styles.button,
                      {
                        backgroundColor: colors.gray,
                      },
                    ]}
                  >
                    Processing...
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        styles.container,
        ,
        {
          backgroundColor,
        },
      ]}
    >
      <StatusBar />
      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 50,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {icon}
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "semibold",
              color: colors.white,
              fontSize: 25,
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            title == "Modules"
              ? props.navigation.navigate("add-module")
              : title == "Videos"
              ? props.navigation.navigate("add-video")
              : title == "Quizzes" && props.navigation.navigate("add-quiz");
          }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              paddingHorizontal: 20,
              padding: 10,
              fontFamily: 14,
              borderRadius: 20,
              fontFamily: "semibold",
              color: "white",
              backgroundColor: addColor,
            }}
          >
            Add New
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width,
          flex: 0.85,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
        }}
      >
        {props.data?.datas == 0 ? (
          <Text
            style={{
              textAlign: "center",
              padding: 25,
              fontSize: 18,
              color: colors.gray,
              fontFamily: "semibold",
            }}
          >
            Nothing to see here.
          </Text>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refresHandler}
              />
            }
            keyboardShouldPersistTaps={"handled"}
            nestedScrollEnabled={true}
            numColumns={1}
            data={props.data?.datas}
            contentContainerStyle={{
              padding: 20,
            }}
            keyExtractor={(item) => item?._id}
            renderItem={renderItem}
          />
        )}
      </View>
      <Toast />
      {/* {props.children} */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
    videos: state.user?.videos,
    modules: state.user?.modules,
    quizzes: state.user?.quizzes,
  };
};

export default connect(mapStateToProps, {
  setVideos,
  setModules,
  setQuizzes,
})(ListTemplate);

const styles = StyleSheet.create({
  deleteCard: {
    marginTop: 10,
    borderTopWidth: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    padding: 5,
    fontFamily: "semibold",
  },
  button: {
    padding: 5,
    fontSize: 14,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "white",
    fontFamily: "regular",
  },
});
