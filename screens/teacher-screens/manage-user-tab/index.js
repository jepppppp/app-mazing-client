import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios_config from "../../../config/axios_config";
import colors from "../../../config/colors";
import { Dimensions } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RefreshControl } from "react-native";
import { externalStyle } from "../../../styles/externalStyle";
import { addAudit, toastHandler } from "../../../services/tools";
import { connect } from "react-redux";
const { width } = Dimensions.get("screen");
const ManageUser = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const refresHandler = async () => {
    setIsRefreshing(true);
    await load();
    setIsRefreshing(false);
  };
  const [deleteTarget, setDeleteTarget] = useState({
    modal: false,
    item: null,
  });
  const load = async () => {
    console.log("start");
    await axios_config
      .get("user")
      .then((res) => {
        console.log(res?.data?.data[0]);
        let response = res?.data?.data?.filter(
          (rd) => rd.role == 2 && rd.grade == props.credentials?.grade
        );
        setDatas(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const deleteHandler = async () => {
    setIsLoading(true);
    await axios_config
      .delete("user/delete/" + deleteTarget.item?._id)
      .then((res) => {
        toastHandler({
          type: "success",
          text1: "User has been deleted!",
          onShow: () => {
            let filter = datas?.filter(
              (pr) => pr._id != deleteTarget.item?._id
            );
            setDatas(filter);
            setIsLoading(false);
          },
        });
        // push audit
        addAudit(
          {
            full_name:
              props.credentials?.first_name +
              " " +
              props.credentials?.last_name,
            id_number: props.credentials?.id_number,
            grade: props.credentials?.grade?.replace("Grade", ""),
          },
          "user_deleted",
          `${deleteTarget.item?.first_name} ${deleteTarget.item?.last_name}`
        );
      })
      .catch((e) => {
        console.log(e);
        toastHandler({ type: "error", text1: "Something went wrong!" });
        setIsLoading(false);
      });
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 0.7,
          borderColor: colors.lightgray,
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "regular", fontSize: 16 }}>
            {item.first_name} {item?.last_name}
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
              {item?.grade}
            </Text>
            {deleteTarget?.item?._id != item?._id && (
              <View style={{ flexDirection: "row", gap: 10 }}>
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
    );
  };
  return (
    <View style={[styles.container]}>
      <StatusBar />

      <View
        style={{
          width,
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <Text
            style={{ fontFamily: "semibold", padding: 20, textAlign: "center" }}
          >
            Please wait while we load the data...{" "}
          </Text>
        ) : (
          <>
            {datas?.length == 0 ? (
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
                data={datas}
                contentContainerStyle={{
                  padding: 20,
                }}
                keyExtractor={(item) => item?._id}
                renderItem={renderItem}
              />
            )}
          </>
        )}
      </View>
      <Toast />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user?.credentials,
  };
};
export default connect(mapStateToProps, {})(ManageUser);

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
  ...externalStyle,
});