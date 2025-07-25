import clsx from 'clsx';
import { createContext, type ReactNode, useContext } from 'react';

const ProseContext = createContext(false);

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Prose({ className, children }: Props) {
  const isInsideProse = useContext(ProseContext);
  if (isInsideProse) return children;

  return (
    <ProseContext.Provider value={true}>
      <article className={clsx(`prose dark:prose-invert w-full max-w-none`, className)}>
        {children}
      </article>
    </ProseContext.Provider>
  );
}
