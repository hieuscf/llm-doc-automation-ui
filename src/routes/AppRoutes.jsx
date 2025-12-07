import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRouter, customerRouter } from './Routes.jsx';
import NotFound from "../pages/NotFound/NotFound.jsx";

function AppRouter() {
    return (
        <Routes>
            {/* Public routes */}
            {publicRouter.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
            ))}

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter;
