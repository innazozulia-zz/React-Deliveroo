import React from "react";

import Sort from "../Components/Sort";
import Categories from "../Components/Categories";
import FoodBlock from "../Components/FoodItems/FoodBlock";
import LoadingFoodBlog from "../Components/FoodItems/LoadingFoodBlock";
import Pagination from "../pagination/Pagination";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filter.category);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [category, setCategory] = React.useState(0);
  // const [sort, setSort] = React.useState({
  //   name: "popular",
  //   sortProperty: "rating",
  // });

  const onClickCategory = (id) => {
    console.log(id);
    dispatch(setCategory(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.replace("-", " ");
    const order = sort.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    fetch(
      `https://6293b734089f87a57ac4de66.mockapi.io/items?page=${currentPage}&limit=6&${
        category > 0 ? `category=${category}` : ""
      }${search}&sortBy=${sortBy}&order=${order}
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All food</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <LoadingFoodBlog key={index} />)
          : items
              // .filter((obj) => {
              //   if (
              //     obj.title.toLowerCase().includes(searchValue.toLowerCase())
              //   ) {
              //     return true;
              //   }
              //   return false;
              // })
              .map((obj) => (
                <FoodBlock
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              ))}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
export default Home;
