import { createContext, ReactNode, useContext, useState } from 'react';

import { Spinner } from '../../components/Spinner';
import { Overlay } from './styles';

interface LoadingContextData {
  setLoading: (value: boolean) => void;
  clearLoading: () => void;
}

const LoadingContext = createContext({} as LoadingContextData);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({
  children,
}: LoadingProviderProps): JSX.Element {
  const [refs, setRefs] = useState(0);

  function setLoading(value: boolean): void {
    if (value) {
      setRefs((prevState) => prevState + 1);
    } else {
      setRefs((prevState) => (prevState <= 0 ? 0 : prevState - 1));
    }
  }

  function clearLoading(): void {
    setRefs(0);
  }

  return (
    <LoadingContext.Provider value={{ setLoading, clearLoading }}>
      {refs > 0 && (
        <Overlay>
          <Spinner inverted />
        </Overlay>
      )}

      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = (): LoadingContextData => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
};
