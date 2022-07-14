import { createContext, ReactNode, useState } from 'react';

type SidebarContextData = {
  menuItemSelected: string;
  selectMenuItem: (value: string) => void;
  subMenuItemSelected: number | null;
  selectSubMenuItem: (value: number) => void;
  isExpanded: boolean;
  changeExpanded: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData,
);

type SidebarProviderProps = {
  children: ReactNode;
};

export function SidebarProvider({
  children,
}: SidebarProviderProps): JSX.Element {
  const [menuItemSelected, setMenuItemSelected] = useState('');
  const [subMenuItemSelected, setSubMenuItemSelected] = useState<number | null>(
    null,
  );
  const [isExpanded, setIsExpanded] = useState(true);

  function selectMenuItem(value: string): void {
    setMenuItemSelected(value);
    setSubMenuItemSelected(null);
  }

  function selectSubMenuItem(value: number): void {
    setSubMenuItemSelected(value);
  }

  function changeExpanded(value: boolean): void {
    setIsExpanded(value);
  }

  return (
    <SidebarContext.Provider
      value={{
        menuItemSelected,
        selectMenuItem,
        subMenuItemSelected,
        selectSubMenuItem,
        isExpanded,
        changeExpanded,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
