import { Link } from '../context/RouterContext';

interface FormattedTextProps {
  text: string;
}

export function FormattedText({ text }: FormattedTextProps) {
  // Regex to match [Anchor text](href)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | { text: string; url: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push({
      text: match[1],
      url: match[2],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <>
      {parts.map((part, idx) => {
        if (typeof part === 'string') {
          return <span key={idx}>{part}</span>;
        }
        if (part.url.startsWith('/')) {
          return (
            <Link
              key={idx}
              to={part.url}
              className="text-[#2E5A44] underline decoration-[#2E5A44]/40 underline-offset-4 hover:decoration-[#2E5A44] transition-colors font-medium"
            >
              {part.text}
            </Link>
          );
        }
        return (
          <a
            key={idx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E5A44] underline decoration-[#2E5A44]/40 underline-offset-4 hover:decoration-[#2E5A44] transition-colors font-medium"
          >
            {part.text}
          </a>
        );
      })}
    </>
  );
}
