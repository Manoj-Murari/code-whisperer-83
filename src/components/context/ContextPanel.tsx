import { motion } from 'framer-motion';
import { FileCode, Database, GitBranch } from 'lucide-react';
import { currentContext } from '@/lib/dummy-data';

export function ContextPanel() {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="w-72 border-l border-border bg-background p-5 overflow-y-auto"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4 tracking-tight">Context</h2>

      {/* Repository Info */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="h-3.5 w-3.5 text-foreground" />
            <h3 className="text-sm font-medium">Repository</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-mono text-xs">{currentContext.repository}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <span className="text-foreground">{currentContext.language}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Files:</span>
              <span>{currentContext.fileCount}</span>
            </div>
          </div>
        </div>

        {/* Current Task */}
        {currentContext.currentTask && (
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-3.5 w-3.5 text-foreground" />
              <h3 className="text-sm font-medium">Current Task</h3>
            </div>
            <p className="text-xs text-muted-foreground">{currentContext.currentTask}</p>
          </div>
        )}

        {/* Files in Context */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FileCode className="h-3.5 w-3.5 text-foreground" />
            <h3 className="text-sm font-medium">Files in Context</h3>
          </div>
          <div className="space-y-1">
            {currentContext.filesInContext.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors px-2 py-1.5 rounded hover:bg-muted"
              >
                {file}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Agent Memory */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <h3 className="text-sm font-medium mb-3">Agent Memory</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-foreground/40 mt-1.5" />
              <span>Main framework: Flask</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-foreground/40 mt-1.5" />
              <span>Test runner: pytest</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-foreground/40 mt-1.5" />
              <span>Architecture: WSGI application</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
