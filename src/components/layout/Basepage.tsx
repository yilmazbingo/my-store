import React from "react";
import HeadTags from "./Head";
import { Container } from "react-bootstrap";

interface BasePageProps {
  indexPage?: boolean;
  className?: string;
  header?: string;
  noWrapper?: boolean;
}

const BasePage: React.FC<BasePageProps> = (props) => {
  const { indexPage, className = "", header, children, noWrapper } = props;
  const pageType = indexPage ? "index-page" : "base-page";
  const Wrapper = noWrapper ? React.Fragment : Container;

  const PageHeader: React.FC<{ header: string }> = ({ header }) => (
    <h1 className="page-header-title">{header}</h1>
  );
  return (
    <>
      <HeadTags></HeadTags>
      <div
        className={`${pageType} ${className}`}
        style={{ display: "flex", flexDirection: "column", flex: "1" }}
      >
        <Wrapper>
          {header && <PageHeader header={header} />}
          {children}
        </Wrapper>
      </div>
    </>
  );
};

export default BasePage;
