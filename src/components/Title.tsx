import React from "react";

const Title = ({ title, color }: { title: string; color?: string }) => {
  return (
    <div className="section-title">
      <h1 style={{ color: `${color ? color : "black"}` }}>{title}</h1>
      <div />
    </div>
  );
};

export default Title;
