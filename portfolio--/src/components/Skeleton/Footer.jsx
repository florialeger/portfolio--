// This file defines the Footer component, providing social links, 
// a contact form, and interactive animations for user engagement.

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Text } from "@components/ui/Text.jsx";
import { useMousePosition } from "@hooks/useMousePosition.jsx";
import { LoadingAnimationWithoutComplete } from "@components/Skeleton/LoadingAnimation.jsx";
import ContactForm from "@components/ui/ContactForm.jsx";
import useMagneticEffect from "@hooks/useMagneticEffect.jsx";
import "./Footer.css";

const socials = [
  { name: "Bento", url: "http://bento.me/floria", icon: "bento.png" },
  {
    name: "Twitter",
    url: "https://twitter.com/florialger",
    icon: "twitter.png",
  },
  {
    name: "LinkedIn",
    url: "http://www.linkedin.com/in/floria-leger-a319442b2",
    icon: "linkedin.png",
  },
  { name: "GitHub", url: "https://github.com/florialeger", icon: "github.png" },
  { name: "Figma", url: "http://figma.com/@florialeger", icon: "figma.png" },
  {
    name: "Procreate",
    url: "https://folio.procreate.com/juju999999997",
    icon: "procreate.png",
  },
];

const SocialIcon = ({ name, url, icon }) => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const [mousePosition] = useMousePosition([containerRef]); // Get mouse position relative to this container

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={`${icon}`} alt={name} />
      {hovered && (
        <motion.div
          className="tooltip"
          style={{
            top: mousePosition.y - 70,
            left: mousePosition.x - 70,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Text type="span" className="tooltip-text text">
            {name}
          </Text>
        </motion.div>
      )}
    </a>
  );
};

const GetInTouch = () => (
  <div className="get-in-touch">
    <LoadingAnimationWithoutComplete id="footer-loading-animation" />
    <Text type="h2" className="text button">
      Get in touch
    </Text>
    <div className="social-icons">
      {socials.map((social) => (
        <SocialIcon key={social.name} {...social} />
      ))}
    </div>
  </div>
);

const ContactMe = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);


  return (
    <div className="contact-me">
      <img src="/mail.png" alt="Mail Background" className="mail-background" />
      <Text
        type="button"
        className="contact-button button"
        onClick={(e) => {
          e.stopPropagation();
          setIsFormOpen(true);
        }}
      >
        Contact Me
      </Text>
      {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    <GetInTouch />
    <ContactMe />
  </footer>
);

export default Footer;
