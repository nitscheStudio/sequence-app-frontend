import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//Context
import { DataProvider } from "./context/InstrumentGenreContext";
import { FileUploadProvider } from "./context/FileUploadContext";

//Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import EditSample from "./pages/EditSample";
import UploadProfilePicture from "./pages/UploadProfilePIcture";

//Layouts
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

//Errors
import RootError from "./errors/RootError";
import UploadSample from "./pages/UploadSample";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<RootError />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />

          <Route
            path="/upload"
            element={
              <FileUploadProvider>
                <UploadSample />
              </FileUploadProvider>
            }
          />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/edit/profile-picture"
        element={
          <FileUploadProvider>
            <UploadProfilePicture />
          </FileUploadProvider>
        }
      />

      <Route path="/edit/sample/:sampleId" element={<EditSample />} />
    </>
  )
);

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
