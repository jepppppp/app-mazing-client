import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import axios_config from "../config/axios_config";

export const checkField = (arr) => {
  let ct = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || arr[i] === undefined || arr[i] === null) {
      ct += 1;
      //   return true; // Found an empty or undefined value
    }
  }
  return ct; // No empty or undefined values found
};
export const toastHandler = ({ text1, onShow, type, onHide }) => {
  Toast.show({
    type,
    position: "bottom",
    text1,
    visibilityTime: 3000,
    autoHide: true,
    onShow,
    onHide,
  });
};

export const createRangenArray = (start, end) => {
  return Array.from(Array(end - start + 1).keys(), (i) => i + start);
};

export const random = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

export const playSound = (file) => {
  Audio.Sound.createAsync(file, {
    shouldPlay: true,
  })
    .then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        res.sound.unloadAsync().catch(() => {});
      });
    })
    .catch((error) => {});
};

export const playAudio = (file, state) => {
  Audio.Sound.createAsync(file, {
    shouldPlay: true,
  })
    .then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        state(true);
        res.sound.unloadAsync().catch(() => {});
      });
    })
    .catch((error) => {});
};
export const checkProfile = (item, user) => {
  let pic;
  if (item?.profile_picture != "no-image") {
    pic = { uri: item?.profile_picture };
  } else {
    pic = require("../assets/images/account-images/profile.jpg");
  }
  return pic;
};
const auditAction = (item, page) => {
  switch (item) {
    case "play":
      return `Played "${page}"`;

    case "watch":
      return `Watched the video "${page}"`;

    case "read":
      return `Read the module "${page}"`;

    case "take_quiz":
      return `Answered the quiz "${page}"`;

    case "user_deleted":
      return `Deleted user "${page}"`;

    default:
      return "";
  }
};
export const addAudit = async (newData, action, page) => {
  let data = {
    ...newData,
    description: auditAction(action, page),
  };
  await axios_config.post("/audit/add", data);
};

export const timeFormatter = (time) => {
  return time > 0
    ? ` ${parseInt(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`
    : " 00:00";
};
