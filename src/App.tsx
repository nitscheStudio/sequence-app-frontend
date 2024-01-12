import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

//Layouts
import RootLayout from "./layouts/RootLayout";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Navbar />
    //   {/* <QueryClientProvider client={queryClient}>
    //     <FilterableSampleList />
    //   </QueryClientProvider> */}
    //   <Login />
    // </BrowserRouter>
  );
}

export default App;
