import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { OnboardingFlow } from "./pages/OnboardingFlow";
import { Dashboard } from "./pages/Dashboard";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingFlow,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/routine/:id",
    Component: RoutineExecution,
  },
  {
    path: "/program",
    Component: ProgramCustomization,
  },
  {
    path: "/nutrition",
    Component: NutritionPlan,
  },
  {
    path: "/tips",
    Component: TipsFeed,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/payment",
    Component: Payment,
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
