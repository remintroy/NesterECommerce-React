import { Avatar } from "@mui/material";
import { useContext } from "react";
import "./style.css";
import { Container } from "@mui/system";
import Header from "../../components/Header";
import UserContext from "../../context/UserContext";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SecurityIcon from "@mui/icons-material/Security";
import { useLocation, useNavigate } from "react-router-dom";
import AccountSettings from "../../components/AccountSettings";
import OrderSettings from "../../components/OrderSettings";
import AddressSettings from "../../components/AddressSettings";
import WalletSettings from "../../components/WalletSettings";
import SecuritySettings from "../../components/SecuritySettings";

function Settings() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="Settngs">
      <Header title="Settings" path="Nester > Settings" />
      <Container>
        <div className="contents">
          <div className="menu">
            {user && (
              <>
                <div className="btn" onClick={() => navigate("/settings/account")}>
                  <div className="icnCont">
                    <Avatar className="Avathar" alt={user.email} src={user.photoURL} />
                  </div>
                  <div className="textCont">
                    <div className="head">Account</div>
                    <div className="tail">View and Edit Your Profile</div>
                  </div>
                </div>
                <div className="btn" onClick={() => navigate("/settings/orders")}>
                  <div className="icnCont">
                    <WorkHistoryIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Orders</div>
                    <div className="tail">Status, return, cancellation...</div>
                  </div>
                </div>
                <div className="btn" onClick={() => navigate("/settings/addresses")}>
                  <div className="icnCont">
                    <AlternateEmailIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Addresses</div>
                    <div className="tail">Add, edit, remove...</div>
                  </div>
                </div>
                <div className="btn" onClick={() => navigate("/settings/wallets")}>
                  <div className="icnCont">
                    <AccountBalanceWalletIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Wallets</div>
                    <div className="tail">Get in touch with wallet.</div>
                  </div>
                </div>
                <div className="btn" onClick={() => navigate("/settings/security")}>
                  <div className="icnCont">
                    <SecurityIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Security</div>
                    <div className="tail">Passwords and security</div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="page">
            {user && (
              <>
                {location.pathname === "/settings/account" && <AccountSettings />}
                {location.pathname === "/settings/orders" && <OrderSettings />}
                {location.pathname === "/settings/addresses" && <AddressSettings />}
                {location.pathname === "/settings/wallets" && <WalletSettings />}
                {location.pathname === "/settings/security" && <SecuritySettings />}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Settings;
