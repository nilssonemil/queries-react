import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  text: string,
}

const MarkdownBox: React.FunctionComponent<Props> = ({ text }) => {
  return (
    <Markdown
      children={text}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')

          return match
            ? (<SyntaxHighlighter
              language={match[1]}
              style={duotoneDark}
              showLineNumbers={true}
              children={children as string} />)
            : (<code {...rest} className={className}>{children}</code>);
        }
      }}
    />
  )
}

export default MarkdownBox
