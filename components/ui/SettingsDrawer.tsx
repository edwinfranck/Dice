"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/lib/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  const settings = useGame((s) => s.settings);
  const updateSettings = useGame((s) => s.updateSettings);
  const resetSetup = useGame((s) => s.resetSetup);
  const router = useRouter();

  function handleReset() {
    if (confirm("Tout réinitialiser ? Vos prénoms et préférences seront effacés.")) {
      resetSetup();
      setOpen(false);
      router.push("/");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-2xl leading-none px-1"
        aria-label="Réglages"
      >
        ⚙️
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] bg-bg border-t-4 border-ink rounded-t-pop-xl p-5 overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-ink/20 rounded-full mx-auto mb-4" />

              <h2 className="display text-3xl mb-4">Réglages</h2>

              <div className="space-y-3">
                <ToggleRow
                  icon="🎲"
                  label="Dés 3D (WebGL)"
                  desc="Désactive si l'animation rame sur ton tél"
                  value={settings.use3D}
                  onChange={(v) => updateSettings({ use3D: v })}
                />
                <ToggleRow
                  icon="⏱"
                  label="Timer"
                  desc="Durée variable selon l'action (30s à 2min30)"
                  value={settings.timerEnabled}
                  onChange={(v) => updateSettings({ timerEnabled: v })}
                />
                <ToggleRow
                  icon="📳"
                  label="Vibrations"
                  desc="Petite vibration au lancer (mobile)"
                  value={settings.vibrationEnabled}
                  onChange={(v) => updateSettings({ vibrationEnabled: v })}
                />
                <ToggleRow
                  icon="🔊"
                  label="Sons"
                  desc="Effets sonores discrets (à venir)"
                  value={settings.soundEnabled}
                  onChange={(v) => updateSettings({ soundEnabled: v })}
                />
              </div>

              <div className="border-t-2 border-ink/10 mt-6 pt-4 space-y-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary w-full">
                  Fermer
                </button>
                <button type="button" onClick={handleReset} className="btn w-full text-sm !text-terracotta !border-terracotta/40">
                  Tout réinitialiser
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ToggleRow({
  icon,
  label,
  desc,
  value,
  onChange,
}: {
  icon: string;
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="w-full flex items-center gap-3 bg-surface border-2 border-ink rounded-pop-lg p-3 text-left shadow-pop hover:-translate-y-0.5 hover:shadow-pop-lg transition-all"
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-display font-extrabold text-base leading-none">{label}</div>
        <div className="text-xs text-muted mt-1">{desc}</div>
      </div>
      <div
        className={`w-12 h-7 rounded-full border-2 border-ink relative transition-colors ${
          value ? "bg-accent" : "bg-bg"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-ink transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}
