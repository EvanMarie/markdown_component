import { useState } from "react";
import "./my.css";

const MarkdownEditor = () => {
  const [text, setText] = useState("");

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const renderedLines = lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return <h1 key={index}>{line.substring(2)}</h1>;
      } else if (line.startsWith("## ")) {
        return <h2 key={index}>{line.substring(3)}</h2>;
      } else if (line.startsWith("### ")) {
        return <h3 key={index}>{line.substring(4)}</h3>;
      } else if (line.startsWith("#### ")) {
        return <h4 key={index}>{line.substring(5)}</h4>;
      } else if (line.startsWith("##### ")) {
        return <h5 key={index}>{line.substring(6)}</h5>;
      } else if (line.startsWith("###### ")) {
        return <h6 key={index}>{line.substring(7)}</h6>;
      } else if (line.startsWith("**")) {
        return (
          <p key={index}>
            <strong>{line.substring(2)}</strong>
          </p>
        );
      } else if (line.startsWith("*") && !line.startsWith("**")) {
        return (
          <p key={index}>
            <em>{line.substring(1)}</em>
          </p>
        );
      } else {
        return <p key={index}>{line}</p>;
      }
    });

    return renderedLines;
  };

  return (
    <main className="main_container">
      <h2>Markdown Editor No Buttons</h2>
      <article>
        <label htmlFor="markdown" />
        <textarea
          className="markdown_textarea"
          name="markdown"
          id="markdown"
          style={{ width: "100%" }}
          cols={30}
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="preview">{renderMarkdown(text)}</div>
      </article>
    </main>
  );
};

export default MarkdownEditor;
