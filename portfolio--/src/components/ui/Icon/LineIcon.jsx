import React from "react";

const LineIcon = ({ width, hovered }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 580 580"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: "var(--textDefault)" }}
    className={`line-icon ${hovered ? "hovered" : ""}`}
  >
    <path
      d="M533.423 303.928C545.258 299.532 487.019 297.92 474.425 298.003C359.81 298.763 196.537 303.028 81.9232 303.929C75.3045 303.981 62.2726 302.574 56.7105 307.688C51.2388 312.718 79.0423 332.986 83.0134 334"
      stroke="currentColor"
      strokeWidth={hovered ? "90" : "60"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LineIcon;