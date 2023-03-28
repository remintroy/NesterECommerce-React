import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import { Container } from "@mui/system";
import Header from "../../components/Header/Header";
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
import { useSelector } from "react-redux";

function Settings() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const location = useLocation();
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 860);

  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth > 860));
  }, []);

  // eslint-disable-next-line
  const positon = location.pathname.split("/").filter((e) => {
    if (e) return e;
  });

  return (
    <div className="Settngs">
      <Header title="Settings" path="Nester > Settings" />
      <Container>
        <div className="contents">
          {user && ((!thisIsPc && location.pathname === "/settings") || thisIsPc) && (
            <div className="menu">
              <>
                <div
                  className={`btn ${
                    positon.at(-1) === "account" || (thisIsPc && positon.at(-1) === "settings") ? "on" : ""
                  }`}
                  onClick={() => navigate("/settings/account")}
                >
                  <div className="icnCont">
                    <Avatar className="Avathar" alt={user.email} src={user.photoURL} />
                  </div>
                  <div className="textCont">
                    <div className="head">Account</div>
                    <div className="tail">View and Edit Your Profile</div>
                  </div>
                </div>
                <div
                  className={`btn ${positon.at(-1) === "orders" ? "on" : ""}`}
                  onClick={() => navigate("/settings/orders")}
                >
                  <div className="icnCont">
                    <WorkHistoryIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Orders</div>
                    <div className="tail">Status, return, cancellation...</div>
                  </div>
                </div>
                <div
                  className={`btn ${positon.at(-1) === "addresses" ? "on" : ""}`}
                  onClick={() => navigate("/settings/addresses")}
                >
                  <div className="icnCont">
                    <AlternateEmailIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Addresses</div>
                    <div className="tail">Add, edit, remove...</div>
                  </div>
                </div>
                <div
                  className={`btn ${positon.at(-1) === "wallets" ? "on" : ""}`}
                  onClick={() => navigate("/settings/wallets")}
                >
                  <div className="icnCont">
                    <AccountBalanceWalletIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Wallets</div>
                    <div className="tail">Get in touch with wallet.</div>
                  </div>
                </div>
                <div
                  className={`btn ${positon.at(-1) === "security" ? "on" : ""}`}
                  onClick={() => navigate("/settings/security")}
                >
                  <div className="icnCont">
                    <SecurityIcon />
                  </div>
                  <div className="textCont">
                    <div className="head">Security</div>
                    <div className="tail">Passwords and security</div>
                  </div>
                </div>
              </>
            </div>
          )}
          <div className="page">
            {user && (
              <>
                {(positon.at(-1) === "account" || (thisIsPc && positon.at(-1) === "settings")) && <AccountSettings />}
                {positon.at(-1) === "orders" && <OrderSettings />}
                {positon.at(-1) === "addresses" && <AddressSettings />}
                {positon.at(-1) === "wallets" && <WalletSettings />}
                {positon.at(-1) === "security" && <SecuritySettings />}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Settings;
