import { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';

import { CatDefinition } from '@/constants/cats';
import { BlinkingCat } from '@/components/blinking-cat';

/** How long a cat stays visible before vanishing (ms). */
const MIN_VISIBLE_MS = 400;
const MAX_VISIBLE_MS = 800;
/** Pause between cat appearances (ms) */
const MIN_HIDDEN_MS = 1 * 60 * 1000; // 1 minute
const MAX_HIDDEN_MS = 12 * 60 * 1000; // 12 minutes

const CAT_SIZE = 120;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

interface Spawn {
  cat: CatDefinition;
  x: number;
  y: number;
  /** Remaining visible time before the cat blinks away. */
  visibleMs: number;
}

interface CatSpawnerProps {
  /** Cats that are still at large. */
  pool: CatDefinition[];
  /** Whether spawning is paused (e.g. a card modal is open). */
  paused: boolean;
  onCatch: (cat: CatDefinition) => void;
}

/**
 * The hunting grounds. Cats blink in at random positions for a fraction of
 * a second, vanish, then reappear elsewhere — tap fast to catch them.
 */
export function CatSpawner({ pool, paused, onCatch }: CatSpawnerProps) {
  const [spawn, setSpawn] = useState<Spawn | null>(null);
  const [field, setField] = useState({ width: 0, height: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep latest values readable from timer callbacks without re-arming them.
  const poolRef = useRef(pool);
  const pausedRef = useRef(paused);
  const fieldRef = useRef(field);

  useEffect(() => {
    poolRef.current = pool;
    pausedRef.current = paused;
    fieldRef.current = field;
  }, [pool, paused, field]);

  useEffect(() => {
    const clearTimer = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const scheduleHidden = () => {
      clearTimer();
      timeoutRef.current = setTimeout(
        blinkIn,
        randomBetween(MIN_HIDDEN_MS, MAX_HIDDEN_MS)
      );
    };

    const blinkIn = () => {
      const { width, height } = fieldRef.current;
      const candidates = poolRef.current;
      if (pausedRef.current || candidates.length === 0 || width === 0 || height === 0) {
        setSpawn(null);
        scheduleHidden();
        return;
      }
      const cat = candidates[Math.floor(Math.random() * candidates.length)];
      const maxX = Math.max(0, width - CAT_SIZE);
      const maxY = Math.max(0, height - CAT_SIZE);
      const visibleMs = randomBetween(MIN_VISIBLE_MS, MAX_VISIBLE_MS);
      setSpawn({
        cat,
        x: randomBetween(0, maxX),
        y: randomBetween(0, maxY),
        visibleMs,
      });
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        setSpawn(null);
        scheduleHidden();
      }, visibleMs);
    };

    scheduleHidden();
    return clearTimer;
  }, []);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setField({ width, height });
  };

  return (
    <View style={styles.field} onLayout={onLayout}>
      {spawn && !paused && (
        <Pressable
          key={`${spawn.cat.id}-${spawn.x}-${spawn.y}`}
          onPress={() => onCatch(spawn.cat)}
          style={[styles.catTouchTarget, { left: spawn.x, top: spawn.y }]}
          hitSlop={12}>
          <BlinkingCat
            image={spawn.cat.image}
            size={CAT_SIZE}
            visibleMs={spawn.visibleMs}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    overflow: 'hidden',
  },
  catTouchTarget: {
    position: 'absolute',
    width: CAT_SIZE,
    height: CAT_SIZE,
  },
});
