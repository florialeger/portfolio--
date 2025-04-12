// This file defines the NotFound page, displaying a 404 error message with an 
// illustration for unavailable routes.

import React from "react";
import { Text } from "@components/ui/Text.jsx";
import "./Pages.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <Text type="h1" className="not-found-title h1">
        404
      </Text>
      <img
        src="/src/assets/img/planche2-second9.png"
        alt="Not Found Illustration"
        className="not-found-image"
      />
      <Text type="p" className="not-found-text">
        Oops, This Page Not Found
      </Text>
      <Text type="p" className="not-found-text">
        The page you are looking for doesn’t exist or an other error occured.
        <br />
        Go back, or head over to florialeger.com to choose a new direction.
      </Text>
    </div>
  );
};

export default NotFound;
