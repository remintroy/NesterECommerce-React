import React, { useContext, useEffect, useState } from "react";
import "./NotiUser.css";
import { Alert, Grow, Snackbar } from "@mui/material";
import NotiUserContext from "../../context/NotiUserContext";

const NotiUser = () => {
  const { notiData } = useContext(NotiUserContext);
  const [show, setShow] = useState(false);

  function TransitionLeft(props) {
    return <Grow {...props} />;
  }

  useEffect(() => {
    setShow(true);
  }, [notiData]);

  const hanldeClose = (event, reason) => {
    // console.log("dd", event, reason);
    if (reason === "timeout") setShow(false);
  };

  return (
    <>
      {show && notiData?.message !== "WLCM_5T" && (
        <Snackbar
          sx={{ bottom: { xs: 55, md: 20 } }}
          open={show}
          autoHideDuration={6000}
          onClose={hanldeClose}
          message={notiData?.message}
          action={notiData?.action}
          TransitionComponent={TransitionLeft}
        >
          {(notiData?.error || notiData?.success) && (
            <Alert severity={notiData?.error ? "error" : "success"} sx={{ width: "100%" }}>
              {notiData?.message}
            </Alert>
          )}
        </Snackbar>
      )}
    </>
  );
};

export default NotiUser;
