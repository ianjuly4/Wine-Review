import RestaurantList from "./components/WineList"
import FormPage from "./components/FormPage";
import AboutPage from "./components/AboutPage";


const routes = [
  {
    path: "/",
    element: <RestaurantList/>,
  },
  
  {
    path: "/FormPage",
    element: <FormPage />,
  },

  {
    path: "/About",
    element: <AboutPage />,
  }
]
export default routes;