import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import "@/api/axiosInterceptor";
import { Toaster } from "./components/ui/toast";
import { useLoadingStore } from "./store/loadingStore";
import PageLoader from "./components/common/PageLoader";

function App() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return (
    <>
      {isLoading && <PageLoader />}
      <Toaster>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:username" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Toaster>
    </>
  );
}
export default App;
