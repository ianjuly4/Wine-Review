import RestaurantList from "./components/WineList"
import FormPage from "./components/FormPage";
import AboutPage from "./components/AboutPage";
import ReviewPage from "./components/ReviewPage"


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
    path: "/ReviewPage",
    element: <ReviewPage />,
  },

  {
    path: "/About",
    element: <AboutPage />,
  }
]
export default routes;