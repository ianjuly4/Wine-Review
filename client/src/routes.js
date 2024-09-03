import RestaurantList from "./components/WineList"
import FormPage from "./components/FormPage";
import Review from "./components/Review";


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
    element: <Review />,
  }
]
export default routes;