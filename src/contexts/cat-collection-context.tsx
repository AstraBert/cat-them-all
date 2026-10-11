import { createContext, ReactNode, useContext } from 'react';

import { useCatCollection, CatCollection } from '@/hooks/use-cat-collection';

const CatCollectionContext = createContext<CatCollection | null>(null);

export function CatCollectionProvider({ children }: { children: ReactNode }) {
  const collection = useCatCollection();
  return <CatCollectionContext.Provider value={collection}>{children}</CatCollectionContext.Provider>;
}

export function useCatCollectionContext(): CatCollection {
  const context = useContext(CatCollectionContext);
  if (!context) {
    throw new Error('useCatCollectionContext must be used within CatCollectionProvider');
  }
  return context;
}
