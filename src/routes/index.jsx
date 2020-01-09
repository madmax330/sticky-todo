import Pages from "layouts/Pages.jsx";
import Todo from "layouts/Todo.jsx";
import authenticate from "components/Authenticate.jsx";

const indexRoutes = [
  { path: "/todo", name: "Todo", component: authenticate(Todo) },
  { path: "/", name: "Index", component: Pages },
];

export default indexRoutes;
