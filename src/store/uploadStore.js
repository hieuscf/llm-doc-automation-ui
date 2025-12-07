import { create } from 'zustand';

export const useUploadStore = create((set) => ({
    crawl: 5,
    setCrawl: (value) => set({ crawl: value }),
}));
