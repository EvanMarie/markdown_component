import { useState, useRef, ChangeEvent } from "react";
import "./my.css";

const MarkdownEditor2 = () => {
  const [text, setText] = useState<string>("");
  const [lineSpacing, setLineSpacing] = useState<number>(1);
  const [previousText, setPreviousText] = useState<string>("");
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
        case "link":
          startSymbol = '<a href="http://';
          endSymbol = '">Selected Text</a>';
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

  const increaseLineSpacing = () => {
    setLineSpacing(lineSpacing + 0.1);
  };

  const decreaseLineSpacing = () => {
    setLineSpacing(Math.max(lineSpacing - 0.1, 0.1));
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextWithUndo(e.target.value);
  };

  const setTextWithUndo = (newText: string) => {
    setPreviousText(text);
    setText(newText);
  };

  const handleUndo = () => {
    setText(previousText);
  };

  return (
    <main className="main_container">
      <h2>Markdown Editor with Buttons</h2>
      <article>
        <label htmlFor="markdown" />
        <button onClick={() => insertMarkdown("h2")}>Heading</button>
        <button onClick={() => insertMarkdown("bold")}>Bold</button>
        <button onClick={() => insertMarkdown("italic")}>Italic</button>
        <button onClick={() => insertMarkdown("link")}>Add Link</button>
        <button onClick={increaseLineSpacing}>+</button>
        <button onClick={decreaseLineSpacing}>-</button>
        <button onClick={handleUndo}>Undo</button>
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
