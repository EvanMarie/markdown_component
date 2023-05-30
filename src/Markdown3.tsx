import { useState, useRef, useEffect } from "react";
import "./my.css";

const MarkdownEditor3 = () => {
  const [text, setText] = useState("");
  const contentEditableDiv = useRef<HTMLDivElement>(null);

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const renderedLines = lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return `<h1>${line.substring(2)}</h1>`;
      } else if (line.startsWith("## ")) {
        return `<h2>${line.substring(3)}</h2>`;
      } else if (line.startsWith("### ")) {
        return `<h3>${line.substring(4)}</h3>`;
      } else if (line.startsWith("#### ")) {
        return `<h4>${line.substring(5)}</h4>`;
      } else if (line.startsWith("##### ")) {
        return `<h5>${line.substring(6)}</h5>`;
      } else if (line.startsWith("###### ")) {
        return `<h6>${line.substring(7)}</h6>`;
      } else {
        const boldRegEx = /\*\*(.*?)\*\*/g;
        const italicRegEx = /\*(.*?)\*/g;

        let html = line.replace(boldRegEx, "<strong>$1</strong>");
        html = html.replace(italicRegEx, "<em>$1</em>");

        return `<p>${html}</p>`;
      }
    });

    return renderedLines;
  };

  const handleContentEditableChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setText(text);
    window.requestAnimationFrame(() => {
      const selection = window.getSelection();
      const range = document.createRange();
      if (selection) {
        range.selectNodeContents(e.currentTarget);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  };

  useEffect(() => {
    if (contentEditableDiv.current) {
      contentEditableDiv.current.innerHTML = text
        ? renderMarkdown(text).join("")
        : "";
    }
  }, [text]);

  const insertMarkdown = (action: string) => {
    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString();
    let startSymbol, endSymbol;

    switch (action) {
      case "bold":
        startSymbol = endSymbol = "**";
        break;
      case "italic":
        startSymbol = endSymbol = "*";
        break;
      case "h1":
        startSymbol = "# ";
        endSymbol = "";
        break;
      case "h2":
        startSymbol = "## ";
        endSymbol = "";
        break;
      case "h3":
        startSymbol = "### ";
        endSymbol = "";
        break;
      default:
        startSymbol = endSymbol = "";
    }

    const newText = startSymbol + selectedText + endSymbol;

    document.execCommand("insertText", false, newText);
  };

  return (
    <main className="main_container">
      <h2>Markdown Editor</h2>
      <article>
        <label htmlFor="markdown" />
        <button onClick={() => insertMarkdown("h1")}>H1</button>
        <button onClick={() => insertMarkdown("h2")}>H2</button>
        <button onClick={() => insertMarkdown("h3")}>H3</button>
        <button onClick={() => insertMarkdown("bold")}>Bold</button>
        <button onClick={() => insertMarkdown("italic")}>Italic</button>
        <div
          ref={contentEditableDiv}
          className="markdown_textarea"
          contentEditable="true"
          onInput={handleContentEditableChange}
        />
      </article>
    </main>
  );
};

export default MarkdownEditor3;
