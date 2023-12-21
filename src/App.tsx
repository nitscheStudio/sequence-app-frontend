import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import FilterableSampleList from "./components/FilterableSampleList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterableSampleList />
    </QueryClientProvider>
  );
}

export default App;
