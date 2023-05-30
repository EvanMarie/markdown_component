type RenderMarkdownProps = {
  text: string;
  lineSpacing: number;
  className?: string;
};

const RenderMarkdown = ({
  text,
  lineSpacing,
  className,
}: RenderMarkdownProps) => {
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

  return <div className={className}>{renderedLines}</div>;
};

export default RenderMarkdown;
