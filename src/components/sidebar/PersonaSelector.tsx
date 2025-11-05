import { motion } from 'framer-motion';
import { useChatStore } from '@/hooks/useChatStore';
import { agentPersonas } from '@/lib/dummy-data';

export function PersonaSelector() {
  const { selectedPersona, setSelectedPersona } = useChatStore();

  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-medium text-muted-foreground tracking-wide">
        Agents
      </h3>
      <div className="space-y-0.5">
        {agentPersonas.map((persona) => {
          const isSelected = selectedPersona.id === persona.id;

          return (
            <motion.button
              key={persona.id}
              onClick={() => setSelectedPersona(persona)}
              whileHover={{ backgroundColor: 'hsl(0 0% 96%)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-muted'
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-md bg-foreground/5 flex items-center justify-center text-xs">
                  {persona.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{persona.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {persona.description}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
