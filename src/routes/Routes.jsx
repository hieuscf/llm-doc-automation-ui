import React from "react";
import LLMDocsHome from "../pages/Home/Home.jsx"
import DocumentsPage from "../pages/Documents/Documents.jsx"
import StatsPage from "../pages/Stats/Stats.jsx"
import CategoriesPage from "../pages/Categories/Categories.jsx"

const publicRouter = [
    { path: '/home', element: <LLMDocsHome /> },
    { path: '/documents', element: <DocumentsPage /> },
    { path: '/stats', element: <StatsPage /> },
    { path: '/categories', element: <CategoriesPage /> },
]

const customerRouter = [
    // { path: '/customer', element: <CustomerHome />, layout: 'default' }
]

export { publicRouter, customerRouter }
