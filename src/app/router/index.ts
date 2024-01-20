import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { BaseLayout, AuthLayout } from "@/widgets";
import {
  PageNotFound,
  PlayerDetailsPage,
  PlayerEditorPage,
  PlayersPage,
  SignInPage,
  SignUpPage,
  TeamDetailsPage,
  TeamEditorPage,
  TeamsPage,
} from "@/pages";
import { useUserStore } from "@/entities";

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
            meta: {
              title: "Teams",
              defaultQuery: {
                page: 1,
              },
            },
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
            meta: {
              title: "Players",
              defaultQuery: {
                page: 1,
              },
            },
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
  {
    name: "page-not-found",
    path: "/404",
    component: PageNotFound,
    meta: { allowAnonymous: true, title: "Page not found" },
  },
];

let isGetUser = false;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Устанавливаем заголовок страницы
  document.title = to.meta?.title
    ? `Basketball - ${to.meta.title}`
    : "Page not found";

  // Проверяем, существует ли маршрут
  if (to.matched.length === 0) {
    return next({ name: "page-not-found" });
  }

  // Стор для работы с пользователем
  const userStore = useUserStore();
  if (!isGetUser) {
    await userStore.getUser();
    isGetUser = true;
  }

  // Если маршрут доступен не для авторизованного пользователя, пропускаем
  if (to.meta && to.meta.allowAnonymous) {
    next();
    return;
  }

  // Если пользователь не авторизован, отправляем на авторизацию
  if (!userStore.isAuthorized) {
    next({ name: "sign-in" });
    return;
  }

  const page = (to.meta?.defaultQuery as any)?.page;
  
  if (page && !to.query?.page) {
    const query = { ...to.query, page }
    next({ ...to, query })
  } else {
    next()
  }
});

export { routes };
export default router;
