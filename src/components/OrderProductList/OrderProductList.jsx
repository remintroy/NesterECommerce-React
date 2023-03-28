import { Button, Chip, Skeleton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { staticFilesBacked } from "../../configs/axios";
import "./style.css";

const SkeletonLoader = ({ thisIsPc }) => {
  return (
    <div className={`OrderListUl skl ${thisIsPc ? "" : "mb"}`}>
      <div className="imgCont">
        <Skeleton variant="rounded" animation="wave" height={"100%"} />
      </div>
      <div className="dataCont skl">
        <div className="category">
          <Skeleton variant="rounded" animation="wave" height={"70px"} width={"100%"} />
        </div>
        <Skeleton variant="rounded" animation="wave" height={"20px"} />
        <div>
          <Skeleton variant="rounded" animation="wave" height={"80px"} />
        </div>
        <div className="btnCont">
          <Skeleton variant="rounded" animation="wave" height={"50px"} />
          <Skeleton variant="rounded" animation="wave" height={"50px"} />
        </div>
      </div>
    </div>
  );
};

const OrderList = ({ thisIsPc, data }) => {
  if (!data?.PID) return <SkeletonLoader thisIsPc={thisIsPc} />;
  //   if (true) return <SkeletonLoader thisIsPc={thisIsPc} />;

  // TODO: Change PID to pid
  const { PID, title, category, offer, price, status, quantity, total } = data;

  return (
    <div className={`OrderListUl ${thisIsPc ? "" : "mb"}`}>
      <div className="imgCont">
        <img src={`${staticFilesBacked}/product_images/${PID}1.jpg`} alt="Product" />
      </div>
      <div className="dataCont">
        <div className="titleTxt">{title}</div>
        <div className="dim sm b A">
          <Tooltip title="Category of product" arrow>
            <span>{category}</span>
          </Tooltip>
        </div>
        <div className="price b">
          {Number(price) - Number(offer || 0)} Rs x {quantity}Pcs
          {offer > 0 && <span className="offer b"> -{offer}Rs Each</span>}
        </div>
        <div className="sm">Total : {total} Rs</div>
        <div className="b sm A">
          <Tooltip title="Current status of order" arrow>
            <span>
              <Chip label={`Status : ${status}`} variant="outlined" />{" "}
            </span>
          </Tooltip>
        </div>
        <div className="btnCont">
          <Button variant="contained">View Product</Button>
          <Button variant="contained">Action</Button>
        </div>
      </div>
    </div>
  );
};

const OrderProductList = ({ data }) => {
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);

  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth > 766));
  }, []);

  return (
    <div className="OrderProductList">
      <div className="sm dim flex-btw">
        <span className="date">Date : {data?.dateOFOrder ? new Date(data?.dateOFOrder).toDateString() : "00"}</span>
        <span className="total">{data?.total} Rs</span>
      </div>
      {data?.products?.map((product, index) => {
        return (
          <OrderList thisIsPc={thisIsPc} data={product} key={`${data?.orderID ? data?.orderID + product?.PID : index}`} />
        );
      })}
    </div>
  );
};

export default OrderProductList;
