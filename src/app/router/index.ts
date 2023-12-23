import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { BaseLayout, AuthLayout } from "@/shared";
import {
  PlayerDetailsPage,
  PlayerEditorPage,
  PlayersPage,
  SignInPage,
  SignUpPage,
  TeamDetailsPage,
  TeamEditorPage,
  TeamsPage,
} from "@/pages";

const routes: Array<RouteRecordRaw> = [
  {
    name: "auth",
    path: "/",
    component: AuthLayout,
    redirect: { name: "sign-in" },
    children: [
      {
        name: "sign-in",
        path: "sign-in",
        component: SignInPage,
        meta: { allowAnonymous: true, title: "Sign in" },
      },
      {
        name: "sign-up",
        path: "sign-up",
        component: SignUpPage,
        meta: { allowAnonymous: true, title: "Sign un" },
      },
    ],
  },
  {
    name: "base",
    path: "/",
    component: BaseLayout,
    redirect: { name: "teams" },
    children: [
      {
        path: "teams",
        name: "teams",
        redirect: { name: "teams-list" },
        children: [
          {
            name: "teams-list",
            path: "list",
            component: TeamsPage,
            meta: { title: "Teams" },
          },
          {
            name: "team-details",
            path: "team-details/:id",
            component: TeamDetailsPage,
            meta: { title: "Team details" },
          },
          {
            name: "team-editor",
            path: "team-editor/:id?",
            component: TeamEditorPage,
            meta: { title: "Team editor" },
          },
        ],
      },
      {
        name: "players",
        path: "players",
        redirect: { name: "players-list" },
        children: [
          {
            name: "players-list",
            path: "list",
            component: PlayersPage,
            meta: { title: "Players" },
          },
          {
            name: "player-details",
            path: "player-details/:id",
            component: PlayerDetailsPage,
            meta: { title: "Player details" },
          },
          {
            name: "player-editor",
            path: "player-editor/:id?",
            component: PlayerEditorPage,
            meta: { title: "Player editor" },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = `Lebron James - ${to.meta.title || "dex"}`;
  next();
});

export { routes };
export default router;
