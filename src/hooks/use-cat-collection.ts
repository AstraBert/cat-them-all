import { useCallback, useEffect, useState } from 'react';

import { TOTAL_CATS } from '@/constants/cats';
import { catchCat, freeAllCats, getCaughtIds } from '@/db/database';

export interface CatCollection {
  loading: boolean;
  caughtIds: Set<string>;
  caughtCount: number;
  isComplete: boolean;
  catch: (catId: string) => Promise<boolean>;
  freeAll: () => Promise<void>;
}

/**
 * Loads the player's caught cats from SQLite and exposes actions to
 * catch a cat or free them all (reset).
 */
export function useCatCollection(): CatCollection {
  const [caughtIds, setCaughtIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getCaughtIds()
      .then((ids) => {
        if (!cancelled) {
          setCaughtIds(new Set(ids));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const catchOne = useCallback(async (catId: string): Promise<boolean> => {
    let isNew = false;
    setCaughtIds((previous) => {
      if (previous.has(catId)) {
        return previous;
      }
      isNew = true;
      const next = new Set(previous);
      next.add(catId);
      return next;
    });
    if (isNew) {
      await catchCat(catId);
    }
    return isNew;
  }, []);

  const freeAll = useCallback(async () => {
    await freeAllCats();
    setCaughtIds(new Set());
  }, []);

  return {
    loading,
    caughtIds,
    caughtCount: caughtIds.size,
    isComplete: caughtIds.size >= TOTAL_CATS,
    catch: catchOne,
    freeAll,
  };
}
