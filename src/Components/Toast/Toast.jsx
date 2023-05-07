import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = (type, title, subtitle, application_name) =>
  toast(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ fontWeight: "bolder", width: "300px", overflow: "hidden" }}>
        {title}
      </div>
      <div style={{ width: "300px", overflow: "hidden" }}>
        {subtitle} {application_name}.
      </div>
    </div>,
    {
      position: "bottom-right",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      className: "toastifyPosition",
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: true,
      type: type,
      closeButton: false,
    }
  );
