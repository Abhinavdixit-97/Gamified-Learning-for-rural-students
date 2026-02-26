import React from "react";

type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="section container fade-in">
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </section>
  );
};

export default Section;
