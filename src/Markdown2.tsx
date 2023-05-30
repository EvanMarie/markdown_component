import { useState, useRef, ChangeEvent } from "react";
import "./my.css";

const MarkdownEditor2 = () => {
  const [text, setText] = useState<string>("");
  const [lineSpacing, setLineSpacing] = useState<number>(1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

        const lineStyle = {
          lineHeight: `${lineSpacing}rem`,
        };

        return (
          <p
            key={index}
            style={lineStyle}
            dangerouslySetInnerHTML={{ __html: html }}
          ></p>
        );
      }
    });

    return renderedLines;
  };

  const insertMarkdown = (action: string) => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd } = textAreaRef.current;
      let startSymbol, endSymbol;

      // Decide the symbols to add based on the action
      switch (action) {
        case "bold":
          startSymbol = endSymbol = "**";
          break;
        case "italic":
          startSymbol = endSymbol = "*";
          break;
        case "h2":
          startSymbol = "## ";
          endSymbol = "";
          break;
        default:
          startSymbol = endSymbol = "";
      }

      const newText =
        text.substring(0, selectionStart) +
        startSymbol +
        text.substring(selectionStart, selectionEnd) +
        endSymbol +
        text.substring(selectionEnd);

      setText(newText);
    }
  };

  const changeLineSpacing = (spacing: number) => {
    setLineSpacing(spacing);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <main className="main_container">
      <h2>Markdown Editor with Buttons</h2>
      <article>
        <label htmlFor="markdown" />
        <button onClick={() => insertMarkdown("h2")}>Heading</button>
        <button onClick={() => insertMarkdown("bold")}>Bold</button>
        <button onClick={() => insertMarkdown("italic")}>Italic</button>
        <button onClick={() => changeLineSpacing(1)}>Line Spacing 1</button>
        <button onClick={() => changeLineSpacing(1.5)}>Line Spacing 1.5</button>
        <button onClick={() => changeLineSpacing(2)}>Line Spacing 2</button>
        <textarea
          ref={textAreaRef}
          className="markdown_textarea"
          name="markdown"
          id="markdown"
          style={{ width: "100%" }}
          cols={30}
          rows={10}
          value={text}
          onChange={handleTextChange}
        />
        <div className="preview">{renderMarkdown(text)}</div>
      </article>
    </main>
  );
};

export default MarkdownEditor2;
