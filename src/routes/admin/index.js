export const admin_routes = [{
    name: "AdminLogin",
    path: "/admin-xpanel/login",
    component: () => import("@/views/admin/pages/Login"),
  },
  
  {
    path: "/admin-xpanel",
    component: () => import("@/views/admin/Layout"),
    meta: {
      middleware: "auth"
    },
    children: [{
        path: "",
        name: "AdminDashboard",
        component: () => import("@/views/admin/pages/Dashboard"),
    },
    {
      path: "changepassword",
      name: "ChangePassword",
      component: () => import("@/views/admin/pages/ChangePassword/Create"),
    },

      {
        path: "user",
        name: "ViewUser",
        component: () => import("@/views/admin/pages/UserM/Index"),
      },
      {
        path: "user/create",
        name: "CreateUser",
        component: () => import("@/views/admin/pages/UserM/Create"),
      },
      {
        path: "user/edit/:id",
        name: "EditUser",
        component: () => import("@/views/admin/pages/UserM/Edit"),
      },

      {
        path: "admin",
        name: "ViewAdmin",
        component: () => import("@/views/admin/pages/Admin/Index"),
      },
      {
        path: "admin/create",
        name: "CreateAdmin",
        component: () => import("@/views/admin/pages/Admin/Create"),
      },
      {
        path: "marchantservice/create",
        name: "CreateUserBank",
        component: () => import("@/views/admin/pages/MarchantService/Create"),
      },
      {
        path: "marchantservice",
        name: "ViewUserBank",
        component: () => import("@/views/admin/pages/MarchantService/Index"),
      },
      {
        path: "marchantservice/edit/:id",
        name: "EditMarchantService",
        component: () => import("@/views/admin/pages/MarchantService/Edit"),
      },
      {
        path: "company",
        name: "ViewBank",
        component: () => import("@/views/admin/pages/CompanyM/Index"),
      },
      {
        path: "company/create",
        name: "CreateBank",
        component: () => import("@/views/admin/pages/CompanyM/Create"),
      },
      {
        path: "company/edit/:id",
        name: "EditCompany",
        component: () => import("@/views/admin/pages/CompanyM/Edit"),
      },
     
      {
        path: "service",
        name: "ViewAeps",
        component: () => import("@/views/admin/pages/Service/Index"),
      },
      {
        path: "service/create",
        name: "CreateAeps",
        component: () => import("@/views/admin/pages/Service/Create"),
      },
      {
        path: "service/edit/:id",
        name: "EditService",
        component: () => import("@/views/admin/pages/Service/Edit"),
      },
      {
        path: "city/create",
        name: "CreateCity",
        component: () => import("@/views/admin/pages/AddCity/Create"),
      },
      
      
      {
        path: "city/edit/:id",
        name: "EditCity",
        component: () => import("@/views/admin/pages/AddCity/Edit"),
      },
      {
        path: "state/create",
        name: "CreateState",
        component: () => import("@/views/admin/pages/AddState/Create"),
      },
      
      {
        path: "state/edit/:id",
        name: "EditState",
        component: () => import("@/views/admin/pages/AddState/Edit"),
      },
      {
        path: "cadre/create",
        name: "CreateCadre",
        component: () => import("@/views/admin/pages/Cadre/Create"),
      },
      {
        path: "adviser/create",
        name: "CreateAdviser",
        component: () => import("@/views/admin/pages/Adviser/Create"),
      },
      {
        path: "adviser",
        name: "ViewAdviser",
        component: () => import("@/views/admin/pages/Adviser/Index"),
      },

    ],
  },
];