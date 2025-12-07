import create from "zustand";

export const useStatsStore = create((set) => ({
    stats: null,
    loading: false,
    error: null,
    fetchStats: async () => {
    set({ loading: true, error: null });
    try {
    const response = await fetch("http://127.0.0.1:8000/stats");
    if (!response.ok) throw new Error("Failed to fetch stats");
    const data = await response.json();
    set({ stats: data.stats, loading: false, error: null });
    } catch (err) {
    set({ error: err.message, loading: false });
    }
    },
    })
);