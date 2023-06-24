import React, { useState } from "react";

const CollapsibleComponent = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-component w-full px-4 ">
      <div
        className="collapsible-header flex justify-between  items-center"
        onClick={toggleCollapsible}
      >
        <span>{title}</span>
        <span className={`icon ${isOpen ? "open" : "closed"}`}>
          {isOpen ? "-" : "+"}
        </span>
      </div>
      {isOpen && <div className="collapsible-content p-3">{children}</div>}
    </div>
  );
};

export default CollapsibleComponent;
