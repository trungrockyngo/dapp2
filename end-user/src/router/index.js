import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: '/login',
        name: '/Login',
        component: () => import("@/views/Login.vue")
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import("@/views/Dashboard.vue"),
        redirect: "/dashboard/home",
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import("@/components/Home.vue"),
            },
            {
                path: "createTender", 
                name: "CreateTender", 
                component: () => import("@/components/CreateTender.vue")
            },
            {
                path: "billing", 
                name: "billingStatus", 
                component: () => import("@/components/BillingStatus.vue")
            },
            {
                path: "sales", 
                name: "salesGraph", 
                component: () => import("@/components/SalesGraph.vue")
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL, 
    routes
});

export default router;