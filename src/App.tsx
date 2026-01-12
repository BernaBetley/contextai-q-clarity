import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

// Pages
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Audit from "./pages/Audit";
import Services from "./pages/Services";
import Measurement from "./pages/Measurement";
import Signals from "./pages/Signals";
import SignalPost from "./pages/SignalPost";
import Resources from "./pages/Resources";
import ResourcePost from "./pages/ResourcePost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FactSheet from "./pages/FactSheet";
import Method from "./pages/Method";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/services" element={<Services />} />
            <Route path="/measurement" element={<Measurement />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/signals/:slug" element={<SignalPost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourcePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/fact-sheet" element={<FactSheet />} />
            <Route path="/method" element={<Method />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
