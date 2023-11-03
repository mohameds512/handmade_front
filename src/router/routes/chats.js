export default [
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/chats/rooms"),
      meta: { pageTitle: "chat", breadcrumb: [{ text: "chat" }] },
    },
    
  ];
  