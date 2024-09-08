import RestaurantList from "./components/WineList"
import FormPage from "./components/FormPage";
import ReviewPage from "./components/ReviewPage";


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
    path: "/Review",
    element: <ReviewPage />,
  }
]
export default routes;