import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Settings from "@/components/Settings";
import Auth from "@/components/Auth";
import Team from "@/components/Team";
import SwitchTeams from "@/components/SwitchTeam";
import Project from "@/components/projects/Project";
import ProjectOverview from "@/components/projects/Project__overview";
import { checkAuthStatus } from "@/util";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
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
      name: "project-id",
      meta: {
        requiresAuth: true
      },
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
      name: "switch-teams",
      component: SwitchTeams,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    checkAuthStatus()
      .then(res => {
        if (res.uid) {
          next();
        } else {
          next("/login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    next();
  }
});
export default router;
