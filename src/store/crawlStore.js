import { create } from "zustand";
import axios from "axios";

export const useCrawlStore = create((set, get) => ({
  crawl: 5, // default
  setCrawl: (value) => set({ crawl: value }),

  // Hàm gọi API FastAPI
  runCrawl: async () => {
    const maxFiles = get().crawl;

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/crawl?max_files=${maxFiles}`
      );
      return res.data;
    } catch (err) {
      console.error("Crawl failed:", err);
      throw err;
    }
  },
}));
