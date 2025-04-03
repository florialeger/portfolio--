import React from "react";
import { motion } from "framer-motion";
import "./SignIcon.css";

export const ArrowRightIcon = ({ width, color }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 580 580"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color }}
  >
    <path
      d="M273.113 86.7806C273.655 82.4495 278.388 89.07 279.068 90.2774C288.815 107.606 302.627 123.615 315.626 138.681L316.021 139.139C349.517 177.964 383.764 216.082 417.336 254.82C427.845 266.945 436.931 279.518 448.336 290.923C458.334 300.922 455.171 307.202 446.257 318.142C426.823 341.992 406.972 365.99 386.242 388.741C363.96 413.197 335.534 432.066 314.036 456.789C305.961 466.076 285.232 481.736 295.229 495.066C293.106 491 298.065 478.758 303 472C313.917 457.052 340.5 435 353 420.5C364 410 374.333 405.5 388 389.5C408.5 365.5 418.5 349 434.051 327.538C436.014 323.802 442.19 310.376 442 305.423C450.757 302.238 407.666 301.07 398.348 301.131C313.545 301.681 192.74 304.77 107.937 305.423C103.04 305.46 93.3979 304.441 89.2825 308.145C85.234 311.789 105.806 326.469 108.744 327.203"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRightIcon;

export const ChevronRightIcon = ({ width, color }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 581 581"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color }}
  >
    <path
      d="M200 87.4522C200.541 83.1211 205.275 89.7416 205.954 90.9491C215.8 108.453 229.794 124.611 242.908 139.811C276.404 178.636 310.65 216.754 344.223 255.492C354.732 267.617 363.818 280.19 375.222 291.595C385.221 301.593 382.057 307.874 373.143 318.814C353.71 342.664 333.858 366.661 313.129 389.413C290.847 413.869 262.421 432.738 240.923 457.461C232.847 466.748 212.119 482.408 222.115 495.737"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="round"
    />
  </svg>
);

export const LineIcon = ({ width, hovered }) => (
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

export const DownloadBottomIcon = ({ width, color, strokeWidth }) => (
  <svg
    style={{
      width: `calc(${width})`,
      height: `calc(${width})`,
    }}
    viewBox="0 0 580 580"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M532.059 474.591C532.059 460.591 526.559 543.594 489.984 543.594C375.369 544.354 218.173 542.693 103.559 543.594C96.9404 543.646 70.2823 535 63.3688 524C51.7416 505.5 44.088 473.577 48.0592 474.591"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DownloadTopIcon = ({ width, color, strokeWidth }) => (
  <svg
    style={{
      width: `calc(${width})`,
      height: `calc(${width})`, 
    }}
    viewBox="0 0 580 580"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M452.841 278.177C456.298 278.609 451.014 282.388 450.05 282.93C436.221 290.711 423.445 301.738 411.421 312.115L411.055 312.431C380.07 339.172 349.649 366.512 318.733 393.314C309.056 401.703 299.023 408.956 289.921 418.061C281.941 426.043 276.929 423.517 268.198 416.401C249.164 400.887 230.012 385.039 211.854 368.49C192.337 350.702 177.278 328.009 157.548 310.847C150.136 304.399 137.638 287.851 127 295.832C130.245 294.138 140.015 298.096 145.408 302.036C157.338 310.751 174.937 331.973 186.509 341.952C194.889 350.734 198.48 358.983 211.249 369.894C230.403 386.259 243.571 394.242 260.699 406.657C263.681 408.224 274.396 413.155 278.349 413.003C280.89 419.994 281.822 385.593 281.774 378.155C281.335 310.454 278.869 214.012 278.349 146.312C278.319 142.403 279.132 134.705 276.176 131.42C273.268 128.188 261.552 144.611 260.966 146.956"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrossIcon = ({ onClick }) => (
  <div className="global-cross-icon" onClick={onClick}>
    <motion.div
      className="global-cross-icon-bar"
      initial={{ opacity: 0, display: "flex", justifyContent: "center" }}
      animate={{ opacity: 1, rotate: 45, y: 2, x: 1 }}
      transition={{ duration: 0.1 }}
    />
    <motion.div
      className="global-cross-icon-bar"
      initial={{ opacity: 0, display: "flex", justifyContent: "center" }}
      animate={{ opacity: 1, rotate: -50, y: -2, x: 0 }}
      transition={{ duration: 0.1 }}
    />
  </div>
);
