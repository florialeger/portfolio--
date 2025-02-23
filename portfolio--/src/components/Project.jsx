import React from "react";
import Text from "../components/Text";

function Project() {
  return (
    <div>
      <Text type="h1">Project Title</Text>
      <Text variant="date">January 1, 2025</Text>
      <Text variant="key-info">Project Duty: Development</Text>
      <Text variant="key-info">Support: Web</Text>
      <Text>This is a description of the project.</Text>
    </div>
  );
}

export default Project;