import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { useChatStore } from '@/hooks/useChatStore';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  const { selectedPersona } = useChatStore();
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: index * 0.03 }}
      className={`flex gap-4 mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-base">
          {selectedPersona.icon}
        </div>
      )}

      <div className={`max-w-[70%] ${isUser ? 'text-right' : ''}`}>
        {!isUser && message.thinking && message.thinking.length > 0 && (
          <div className="mb-2 text-xs text-muted-foreground space-y-0.5">
            {message.thinking.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                {step}
              </div>
            ))}
          </div>
        )}

        <div className={`prose prose-sm max-w-none ${isUser ? 'text-foreground' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { node, className, children, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                const inline = !className;

                return !inline && match ? (
                  <CodeBlock code={codeString} language={match[1]} />
                ) : (
                  <code
                    className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs"
                    {...rest}
                  >
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="border border-border px-3 py-2 bg-muted text-left font-medium text-sm">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-border px-3 py-2 text-sm">
                    {children}
                  </td>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-xs font-medium">
          U
        </div>
      )}
    </motion.div>
  );
}
