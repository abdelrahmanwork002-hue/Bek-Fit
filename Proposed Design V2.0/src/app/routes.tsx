import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { OnboardingFlow } from "./pages/OnboardingFlow";
import { Home } from "./pages/Home";
import { RoutineExecution } from "./pages/RoutineExecution";
import { ProgramCustomization } from "./pages/ProgramCustomization";
import { NutritionPlan } from "./pages/NutritionPlan";
import { TipsFeed } from "./pages/TipsFeed";
import { Profile } from "./pages/Profile";
import { Payment } from "./pages/Payment";
import { Blog } from "./pages/Blog";
import { BlogArticle } from "./pages/BlogArticle";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <OnboardingFlow />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute requireOnboarding>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/routine/:id",
    element: (
      <ProtectedRoute requireOnboarding>
        <RoutineExecution />
      </ProtectedRoute>
    ),
  },
  {
    path: "/program",
    element: (
      <ProtectedRoute requireOnboarding>
        <ProgramCustomization />
      </ProtectedRoute>
    ),
  },
  {
    path: "/nutrition",
    element: (
      <ProtectedRoute requireOnboarding>
        <NutritionPlan />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tips",
    element: (
      <ProtectedRoute requireOnboarding>
        <TipsFeed />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requireOnboarding>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/blog",
    Component: Blog,
  },
  {
    path: "/blog/:id",
    Component: BlogArticle,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);