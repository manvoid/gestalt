import { Context, createContext, ReactNode, useContext } from 'react';

type NestingContextType = {
  nestedLevel: number;
};

type Props = {
  componentName: 'SideNavigation' | 'List' | 'TableOfContents';
  maxNestedLevels: number;
  children: ReactNode;
};

const NestingContext: Context<NestingContextType> = createContext<NestingContextType>({
  nestedLevel: 0,
});

const { Provider } = NestingContext;

function NestingProvider({ componentName, children, maxNestedLevels }: Props) {
  const { nestedLevel } = useContext(NestingContext);

  const nextNestedLevel = (nestedLevel ?? 0) + 1;

  if (nextNestedLevel > maxNestedLevels) {
    throw new Error(
      `Gestalt ${componentName} does not allow more than ${maxNestedLevels} nested levels`,
    );
  }

  return (
    <Provider
      value={{
        nestedLevel: nextNestedLevel,
      }}
    >
      {children}
    </Provider>
  );
}

function useNesting(): NestingContextType {
  const { nestedLevel } = useContext(NestingContext);
  return { nestedLevel: nestedLevel ?? 0 };
}

export { NestingProvider, useNesting };
