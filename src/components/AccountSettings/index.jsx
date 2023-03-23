import "./style.css";
import UserContext from "../../context/UserContext";
// import NotiUserContext from "../../context/NotiUserContext";
import { Alert, Box, Button, CircularProgress, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageConfig } from "../../configs/firebase";
import { authBackend } from "../../configs/axios";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import NavBarContext from "../../context/NavBarContext";

function AccountSettings() {
  const { user, refreshUser } = useContext(UserContext);
  // const { notiUser } = useContext(NotiUserContext);
  const [imgFile, setImgFile] = useState(null);
  const input = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuerys = location.search?.split("?")[1]?.split("&");
  const [newEditValue, setNewEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStatusEdit, setShowStatusEdit] = useState({
    error: false,
    success: false,
    message: "This will change permenantly",
  });
  const { setInNav } = useContext(NavBarContext);

  useEffect(() => {
    setInNav({ message: "Account Settings", path: "/settings" });
    return () => {
      setInNav(null);
    };
  }, [setInNav]);

  const uploadImage = async () => {
    return new Promise((resolve, reject) => {
      if (imgFile) {
        const storageRef = ref(
          storageConfig,
          `users/${user.uid}/pp.${imgFile.name.split(".")[imgFile.name.split(".").length - 1]}`
        );

        const uploadTask = uploadBytesResumable(storageRef, imgFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // here we get the progress of the upload;
            console.log(progress);
          },
          (error) => {
            // storage error
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              // after completeing image uploading, upload data to firestore
              try {
                const { data } = await authBackend.post(
                  "update_user_data",
                  { photoURL: downloadURL },
                  { headers: { Authorization: `Bearer ${user?.accessToken}` } }
                );
                refreshUser();
                resolve(data?.message ? data.message : "Updated");
              } catch (error) {
                console.log(error);
                reject(error);
              }
            });
          }
        );
      }
    });
  };

  useEffect(() => {
    uploadImage();
    // eslint-disable-next-line
  }, [imgFile]);

  useEffect(() => {
    setShowStatusEdit({ message: "This will change permenantly", error: false, success: false });
    setLoading(false);
    if (searchQuerys?.includes("edit=name") || searchQuerys?.includes("edit=phone")) {
      setNewEditValue(searchQuerys?.includes("edit=name") ? user?.name : user?.phone);
    }
    // eslint-disable-next-line
  }, [location]);

  const handleSave = async (type) => {
    try {
      setLoading(true);
      let dataToUpdate;
      if (type === "name") {
        const error = { response: { data: { error: "Name cannot be empty" } } };
        if (newEditValue.length === 0) throw error;
        dataToUpdate = { name: newEditValue };
      } else {
        const error = { response: { data: { error: "Phone number cannot be empty" } } };
        if (newEditValue.length === 0) throw error;
        dataToUpdate = { phone: newEditValue };
      }
      await authBackend.post("update_user_data", dataToUpdate, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      refreshUser();
      setShowStatusEdit({ message: `${type} updated successfully`, success: true });
      // TODO : update the status to snackbar
      // notiUser({ message: "Updated successfully", success: true });
      setLoading(false);
    } catch (error) {
      setShowStatusEdit({
        error: true,
        message: error?.response?.data?.error ? error?.response?.data?.error : error?.message,
      });
      setLoading(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="AccountSettings">
      <div className="listCont">
        <div className="list">
          <img src={user.photoURL} alt={user.email} />
          <input
            type="file"
            ref={input}
            className="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImgFile(e.target.files[0]);
              }
            }}
            hidden
          />
          <IconButton
            aria-label="Edit"
            onClick={() => {
              if (input.current) input.current.click();
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
        <div className="list">
          <div className="data dim">{user?.email}</div>
          <IconButton aria-label="Edit" disabled>
            <EditIcon />
          </IconButton>
        </div>
        <div className="list">
          <div className={`data A ${!user?.name ? "dim" : ""}`}>{user?.name ? user?.name : "Name"}</div>
          <IconButton aria-label="Edit" onClick={() => navigate("/settings/account?edit=name")}>
            <EditIcon />
          </IconButton>
        </div>
        <div className="list">
          <div className={`data ${!user?.phone ? "dim" : ""}`}>{user?.phone ? user?.phone : "Phone"}</div>
          <IconButton aria-label="Edit" onClick={() => navigate("/settings/account?edit=phone")}>
            <EditIcon />
          </IconButton>
        </div>
      </div>

      <Modal
        open={searchQuerys?.includes("edit=name") || searchQuerys?.includes("edit=phone") ? true : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => navigate("/settings/account")}
      >
        <Box sx={style}>
          {!loading && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {searchQuerys?.includes("edit=name") ? "Edit Name" : "Edit phone number"}
              </Typography>
              <Alert
                severity={showStatusEdit.error ? "error" : showStatusEdit.success ? "success" : "info"}
                style={{ marginTop: "10px" }}
              >
                {showStatusEdit.message}
              </Alert>
              <TextField
                value={newEditValue}
                onChange={(e) => setNewEditValue(e.target.value)}
                style={{ width: "100%", marginTop: "15px" }}
                id="outlined-basic"
                label={searchQuerys?.includes("edit=name") ? "Name" : "Phone number"}
                variant="outlined"
              />
              <Button
                style={{ width: "100%", height: "50px", boxSizing: "border-box", marginTop: "15px" }}
                variant="contained"
                onClick={() => {
                  let typeOfEdit = searchQuerys?.includes("edit=name") ? "name" : "phone";
                  handleSave(typeOfEdit);
                }}
              >
                Save
              </Button>
            </>
          )}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <CircularProgress color="inherit" /> Saving
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default AccountSettings;
