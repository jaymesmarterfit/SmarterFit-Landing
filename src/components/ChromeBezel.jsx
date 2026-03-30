/* eslint-disable */
import React from "react";
import "./PhonePreview.css";

const ChromeBezel = ({ children }) => {
  return (
    <div className="chrome-bezel">
      <div className="chrome-inner">
        <div className="chrome-glass">
          {/* Top sensors / notch */}
          <div className="chrome-notch">
            <span className="notch-camera" />
            <span className="notch-sensor" />
          </div>

          {/* Screen content (PhonePreview) */}
          {children}

          {/* Gesture bar */}
          <div className="chrome-home-bar" />
        </div>
      </div>
    </div>
  );
};

export default ChromeBezel;










