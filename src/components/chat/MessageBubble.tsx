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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl shadow-lg shadow-primary/20">
          {selectedPersona.icon}
        </div>
      )}

      <div
        className={`max-w-[80%] ${
          isUser
            ? 'bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md border border-primary/30 rounded-2xl rounded-tr-sm'
            : 'bg-card/60 backdrop-blur-md border border-primary/20 rounded-2xl rounded-tl-sm'
        } px-6 py-4 shadow-xl`}
      >
        {!isUser && message.thinking && message.thinking.length > 0 && (
          <div className="mb-3 text-xs text-muted-foreground space-y-1">
            {message.thinking.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
                {step}
              </div>
            ))}
          </div>
        )}

        <div className={`prose prose-invert prose-sm max-w-none ${isUser ? 'text-foreground' : ''}`}>
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
                    className="px-1.5 py-0.5 rounded bg-muted/50 text-primary font-mono text-xs"
                    {...rest}
                  >
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse border border-border/50">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="border border-border/50 px-4 py-2 bg-muted/30 text-left font-semibold">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-border/50 px-4 py-2">
                    {children}
                  </td>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-sm font-semibold shadow-lg shadow-secondary/20">
          U
        </div>
      )}
    </motion.div>
  );
}
