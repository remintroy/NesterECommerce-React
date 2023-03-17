import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import "./style.css";

function AccountSettings() {
  const { user, refreshUser } = useContext(UserContext);
  const [allowEdit, setAllowEdit] = useState(false);

  return (
    <div className="AccountSettings">
      <div className="allowEditing">
        <Button variant="contained" onClick={() => setAllowEdit((pre) => !pre)}>
          Edit
        </Button>
      </div>
      <div className="profile">
        <img src={user.photoURL} alt={user.email} /> 
      </div>

      <div className="inputs">
        <div className="input">
          {!allowEdit && <div className="title">{user?.name}</div>}
          {allowEdit && <TextField fullWidth label="Name" value={user.name} variant="outlined" />}
        </div>
        <div className="input">
          {!allowEdit && <div className="title">{user?.email}</div>}
          {allowEdit && <TextField fullWidth label="Email" value={user.email} variant="outlined" />}
        </div>
        <div className="input">
          {!allowEdit && <div className="title">{user?.phone ? user.phone : ""}</div>}
          {allowEdit && <TextField fullWidth label="Phone" value={user?.phone ? user.phone : ""} variant="outlined" />}
        </div>
      </div> 
    </div>
  );
}

export default AccountSettings;
