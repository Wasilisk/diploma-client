import { create } from 'zustand';
import {Direction, Tour} from "shared/utils/types";

interface TourModalState {
  isOpen: boolean;
  defaultValues: Tour | null;
  selectedDirection: Direction | null;
  setIsOpen: (value: boolean) => void;
  setDefaultValue: (values: Tour | null) => void;
  setSelectedDirection: (direction: Direction | null) => void;
}

export const useTourModal = create<TourModalState>((set) => ({
  isOpen: false,
  defaultValues: null,
  selectedDirection: null,
  setIsOpen: (value) => set({ isOpen: value }),
  setDefaultValue: (value) => set({ defaultValues: value }),
  setSelectedDirection: (value) => set({ selectedDirection: value }),
}));
