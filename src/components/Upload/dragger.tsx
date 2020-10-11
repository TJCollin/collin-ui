import React, { useState } from "react";
import ClassNames from "classnames";

export interface DraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [overTag, setOverTag] = useState(false);
  const handleDrag = (e: React.DragEvent, tag: boolean) => {
    e.preventDefault();
    setOverTag(tag);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setOverTag(false);
    onFile(e.dataTransfer.files);
  };
  const classes = ClassNames("dragger", {
    "drag-active": overTag,
  });
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
