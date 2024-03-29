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
import UploadPageMobileNotification from "./pages/UploadPAgeMobileNotification";

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
          <Route
            path="/browse"
            element={
              <DataProvider>
                <Browse />
              </DataProvider>
            }
          />
          <Route
            path="/upload"
            element={
              <DataProvider>
                <FileUploadProvider>
                  <UploadSample />
                </FileUploadProvider>
              </DataProvider>
            }
          />
        </Route>
        <Route
          path="/edit/profile-picture"
          element={
            <FileUploadProvider>
              <UploadProfilePicture />
            </FileUploadProvider>
          }
        />

        <Route
          path="/edit/sample/:sampleId"
          element={
            <DataProvider>
              <EditSample />
            </DataProvider>
          }
        />
        <Route
          path="/mobile-upload-info"
          element={<UploadPageMobileNotification />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
