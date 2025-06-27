import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
    layout('routes/admin/adminlayout.tsx', [
         route('dashboard','routes/admin/dashboard.tsx', ),
        route('AllUsers','routes/admin/all-users.tsx', )

    ])
   
] satisfies RouteConfig;