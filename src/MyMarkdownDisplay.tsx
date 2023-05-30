import React from "react";

interface MyMarkdownDisplayProps {
  text: string;
}

const renderMarkdown = (text: string) => {
  const lines = text.split("\n");
  const renderedLines = lines.map((line, index) => {
    if (line.startsWith("## ")) {
      return <h2 key={index}>{line.substring(3)}</h2>;
    } else {
      const boldRegEx = /\*\*(.*?)\*\*/g;
      const italicRegEx = /\*(.*?)\*/g;

      let html = line.replace(boldRegEx, "<strong>$1</strong>");
      html = html.replace(italicRegEx, "<em>$1</em>");

      return <p key={index} dangerouslySetInnerHTML={{ __html: html }}></p>;
    }
  });

  return renderedLines;
};

const MyMarkdownDisplay: React.FC<MyMarkdownDisplayProps> = ({ text }) => {
  return <div className="preview">{renderMarkdown(text)}</div>;
};

export default MyMarkdownDisplay;
