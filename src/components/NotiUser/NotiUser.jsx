import React, { useEffect, useState } from "react";
import "./NotiUser.css";
import { Alert, Grow, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";

const NotiUser = () => {
  const notiData = useSelector((state) => state.noti.data);
  const [show, setShow] = useState(false);

  function TransitionLeft(props) {
    return <Grow {...props} />;
  }

  useEffect(() => {
    setShow(true);
  }, [notiData]);

  const hanldeClose = (event, reason) => {
    if (reason === "timeout") setShow(false);
  };

  return (
    <>
      {show && notiData?.message !== "WLCM_5T" && (
        <Snackbar
          anchorOrigin={{ open: false, vertical: "bottom", horizontal: "left" }}
          sx={{ bottom: { xs: 55, md: 20 } }}
          open={show}
          autoHideDuration={6000}
          onClose={hanldeClose}
          message={notiData?.message}
          action={notiData?.action}
          TransitionComponent={TransitionLeft}
        >
          {(notiData?.error || notiData?.success) && (
            <Alert
              severity={notiData?.error ? "error" : "success"}
              style={{ backgroundColor: "white", border: "1px solid var(--borderCommon)" }}
              // variant="outlined"
              sx={{ width: "100%" }}
            >
              {notiData?.message}
            </Alert>
          )}
        </Snackbar>
      )}
    </>
  );
};

export default NotiUser;
