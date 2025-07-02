import {route, type RouteConfig } from "@react-router/dev/routes";

export default [
    route("/", "./routes/home.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
    route("/dashboard", "./routes/dashboard.tsx"),
    route("/create", "./routes/creategroupform.tsx"),
    route("/my-groups", "./routes/mygroups.tsx"),
    route("/group/:groupId/tasks", "./routes/grouptasks.tsx"),
    route("/group/join/:inviteCode", "./routes/joingroup.tsx"),
] satisfies RouteConfig;