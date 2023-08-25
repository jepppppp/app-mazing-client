import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setIsDone } from "../../redux";
import { Recognition } from "../../screens";
import Hand from "../../components/student-components/assestment-tab/Hand";
import Bottle from "../../components/student-components/assestment-tab/Bottle";
import Numeracy from "../../components/student-components/assestment-tab/Numeracy";
import Diagnostic from "../student-components/assestment-tab/Diagnostic";

const PreAssestment = (props) => {
  const [currentGame, setCurrentGame] = useState(1);
  useEffect(() => {
    console.log(currentGame);
  });
  const backHandler = () => {
    props?.setIsDone(true);
    props?.navigation.goBack();
  };
  const validateHandler = () => {
    if (props?.credentials?.grade?.toLowerCase() == "kinder") {
      backHandler();
    } else {
      setCurrentGame(2);
    }
  };
  return (
    <>
      {currentGame == 1 ? (
        <>
          {props?.credentials?.grade.toLowerCase() == "kinder" ? (
            <Recognition nextHandler={validateHandler} isAssestment={true} />
          ) : (
            <Hand nextHandler={validateHandler} />
          )}
        </>
      ) : currentGame == 2 ? (
        <Bottle nextHandler={() => setCurrentGame(3)} />
      ) : currentGame == 3 ? (
        <Numeracy nextHandler={() => setCurrentGame(4)} />
      ) : (
        <Diagnostic nextHandler={backHandler} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state?.user?.credentials,
  };
};
export default connect(mapStateToProps, { setIsDone })(PreAssestment);
