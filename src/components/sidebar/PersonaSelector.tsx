import { motion } from 'framer-motion';
import { useChatStore } from '@/hooks/useChatStore';
import { agentPersonas } from '@/lib/dummy-data';

export function PersonaSelector() {
  const { selectedPersona, setSelectedPersona } = useChatStore();

  return (
    <div className="space-y-2">
      <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Agent Personas
      </h3>
      <div className="space-y-1">
        {agentPersonas.map((persona) => {
          const isSelected = selectedPersona.id === persona.id;

          return (
            <motion.button
              key={persona.id}
              onClick={() => setSelectedPersona(persona)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary/10 border border-primary/50 shadow-lg shadow-primary/20'
                  : 'bg-muted/30 border border-transparent hover:bg-muted/50 hover:border-primary/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${persona.gradient} flex items-center justify-center text-sm shadow-lg ${
                    isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                  }`}
                >
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
