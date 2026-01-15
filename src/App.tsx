import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

// Pages
import Index from "./routes/Index";
import HowItWorks from "./routes/HowItWorks";
import Audit from "./routes/Audit";
import Services from "./routes/Services";
import Measurement from "./routes/Measurement";
import Signals from "./routes/Signals";
import SignalPost from "./routes/SignalPost";
import Resources from "./routes/Resources";
import ResourcePost from "./routes/ResourcePost";
import About from "./routes/About";
import Contact from "./routes/Contact";
import FactSheet from "./routes/FactSheet";
import Method from "./routes/Method";
import NotFound from "./routes/NotFound";
import Privacy from "./routes/Privacy";
import Terms from "./routes/Terms";

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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
