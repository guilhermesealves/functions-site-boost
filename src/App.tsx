import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Builder from "./pages/Builder";
import Pricing from "./pages/Pricing";
import Learn from "./pages/Learn";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail";
import MySite from "./pages/MySite";
import MyStore from "./pages/MyStore";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Discounts from "./pages/Discounts";
import Analytics from "./pages/Analytics";
import Customize from "./pages/Customize";
import Plan from "./pages/Plan";
import Settings from "./pages/Settings";
import ToolPage from "./pages/ToolPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/my-site" element={<MySite />} />
          <Route path="/my-store" element={<MyStore />} />
          <Route path="/store/products" element={<Products />} />
          <Route path="/store/orders" element={<Orders />} />
          <Route path="/store/customers" element={<Customers />} />
          <Route path="/store/discounts" element={<Discounts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
