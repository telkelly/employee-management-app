import {route, type RouteConfig } from "@react-router/dev/routes";

export default [
    route("/", "./routes/home.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
] satisfies RouteConfig;