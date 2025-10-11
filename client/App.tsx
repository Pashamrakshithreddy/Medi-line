import "./global.css";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, auth, type User } from "@/lib/firebase";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Faq from "./pages/Faq";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PatientPortal from "./pages/PatientPortal";
import Privacy from "./pages/Privacy";
import Services from "./pages/Services";
import EmergencyCare from "./pages/services/EmergencyCare";
import SpecialistServices from "./pages/services/SpecialistServices";
import VirtualConsultation from "./pages/services/VirtualConsultation";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout user={user} />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="services" element={<Services />} />
              <Route path="services/virtual" element={<VirtualConsultation />} />
              <Route path="services/emergency" element={<EmergencyCare />} />
              <Route path="services/specialist" element={<SpecialistServices />} />
              <Route path="insights" element={<Insights />} />
              <Route
                path="patient-portal"
                element={user ? <PatientPortal user={user} /> : <Login />}
              />
              <Route path="faq" element={<Faq />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
