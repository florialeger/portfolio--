import procreate from "./../../assets/img/procreate.png";
import figma from "./../../assets/img/figma.png";
import code from "./../../assets/img/code.png";
import { Squircle } from "corner-smoothing";
import "./Logo.css";

function Rectangle({ children, className }) {
  return (
    <Squircle
      className={`rectangle ${className}`}
      cornerRadius={24}
      cornerSmoothing={0.6}

      style = {{
        boxShadow: "var(--shadows--normal)",
      }}
    >
      {children}
    </Squircle>
  );
}

// Icône Figma
export function FigmaLogo() {
  return (
    <Rectangle className="figma">
      <img src={figma} alt="Figma Logo" width="100%" />
    </Rectangle>
  );
}

export function CodeLogo() {
  return (
    <Rectangle className="code">
      <img src={code} alt="Code Logo" width="100%" />
    </Rectangle>
  );
}

export function ProcreateLogo() {
  return (
    <Rectangle className="procreate">
      <img src={procreate} alt="Procreate Logo" width="100%" />
    </Rectangle>
  );
}

export default function Logo() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <FigmaLogo />
      <CodeLogo />
      <ProcreateLogo />
    </div>
  );
}
