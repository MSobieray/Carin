import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Settings from "@/components/Settings";
import Auth from "@/components/Auth";
import Team from "@/components/Team";
import SwitchTeams from "@/components/SwitchTeam";
import Project from "@/components/projects/Project";
import ProjectOverview from "@/components/projects/Project__overview";
import { auth } from "../firebase/config";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/team",
      name: "team",
      component: Team,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/team/:teamName/project/:projectID",
      component: Project,
      name: "Project",
      children: [
        {
          path: "overview",
          name: "ProjectOverview",
          component: ProjectOverview
        }
      ]
    },
    {
      path: "/team/switch",
      component: SwitchTeams
    },
    {
      path: "/login",
      name: "login",
      component: Auth
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

/* Safeguard routes to check if user
 * is authenticated with Firebase
 */

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
export default router;
