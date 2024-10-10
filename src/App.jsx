import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import Buy from "./pages/Buy";
import CapDesign from "./pages/CapDesign";
import Design from "./pages/Design";
import Account from "./pages/Account";
import Error from "./pages/Error";
import AppLayout from "./components/layout/AppLayout";
import Preview from "./pages/Preview";
import Cap from "./pages/Cap";







export default function App() {
  const router = createBrowserRouter([
    {
    path:"/",
    element:<AppLayout/>,
    children:[
        {
            path: "/",
            element: <Products />,
          },
          {
            path:"/cap",
            element: <Cap />,
          },
          
          {
            path: "/buy",
            element: <Buy />,
          },
          {
            path: "/capcustomizer",
            element: <CapDesign />,
          },
          {
            path: "/design",
            element: <Design />,
          },
          
          {
            path: "/preview",
            element: <Preview />,
          },
          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "*",
            element: <Error />,
          },
        ]
        
  },
    
   
  ]);
  return <RouterProvider router={router} />;
}
