import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import {LinksPage} from "../pages/LinksPage";
import {CreatePage} from "../pages/CreatePage";
import {DetailPage} from "../pages/DetailPage";
import {AuthPage} from "../pages/AuthPage";

const AppRouter = ({isRegistered}) => {
  return (
    <Routes>
      {isRegistered && (
        <>
          <Route path="/links" element={<LinksPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/create" replace />} />
        </>
      )}
      {!isRegistered && (
        <>
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  )
}

export default AppRouter;