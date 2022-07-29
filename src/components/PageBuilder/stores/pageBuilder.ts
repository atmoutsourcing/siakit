import create from 'zustand';

type ActionType = {
  label: string;
  href: string;
};

export type OptionType = {
  value: string;
  label: string;
};

export type FieldType = {
  label: string;
  dataIndex: string;
  type: string;
  mask?: string;
  options?: OptionType[];
  href?: string;
  parent?: string;
};

type ListActionType = {
  label: string;
  action: {
    type: string;
    href: string;
  };
  type?: string;
};

export type ExportType = {
  label: string;
  href: string;
};

type SortType = { dataIndex: string; direction: string };

export type ConfigType = {
  id: string;
  label: string;
  slug: string;
  actions: ActionType[];
  filter: {
    hasSearch: boolean;
    fields: FieldType[];
  };
  list: {
    href: string;
    usePagination?: boolean;
    defaultSort?: SortType;
    perPage?: number;
    fields: FieldType[];
    actions?: ListActionType[];
    footer: { [key: string]: string };
  };
  exports: ExportType[];
};

type FiltersType = { [key: string]: string | number };

interface ChangeParentData {
  parent: string;
  value: string | number;
}

interface State {
  config: ConfigType | null;
  setConfig: (config: ConfigType) => void;

  totalCount: number;
  setTotalCount: (totalCount: number) => void;

  currentPage: number;
  setCurrentPage: (totalCount: number) => void;

  perPage: number;
  setPerPage: (totalCount: number) => void;

  filtersVisible: boolean;
  toggleFiltersVisibility: () => void;

  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;

  filterParents: FiltersType;
  changeParent: (changeParentData: ChangeParentData) => void;

  sort: SortType;
  setSort: (sort: SortType) => void;
}

export const usePageBuilderStore = create<State>((set) => ({
  config: null,
  setConfig: (config: ConfigType) => set(() => ({ config })),

  totalCount: 0,
  setTotalCount: (totalCount: number) => set(() => ({ totalCount })),

  currentPage: 1,
  setCurrentPage: (currentPage: number) => set(() => ({ currentPage })),

  perPage: 20,
  setPerPage: (perPage: number) => set(() => ({ perPage })),

  filtersVisible: false,
  toggleFiltersVisibility: () =>
    set((state) => ({ filtersVisible: !state.filtersVisible })),

  filters: {},
  setFilters: (filters: FiltersType) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      currentPage: 1,
    })),

  filterParents: {},
  changeParent: ({ parent, value }: ChangeParentData) =>
    set((state) => ({
      filterParents: { ...state.filterParents, [parent]: value },
    })),

  sort: {} as SortType,
  setSort: (sort: SortType) => set(() => ({ sort })),
}));
