import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Sort, { sortList } from "../Components/Sort";
import Categories from "../Components/Categories";
import FoodBlock from "../Components/FoodItems/FoodBlock";
import LoadingFoodBlog from "../Components/FoodItems/LoadingFoodBlock";
import Pagination from "../pagination/Pagination";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = useSelector((state) => state.filter.category);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = React.useContext(AppContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);

  // const [currentPage, setCurrentPage] = React.useState(1);  переписали с помошью redux
  // const [category, setCategory] = React.useState(0);  переписали с помошью redux
  // const [sort, setSort] = React.useState({  переписали с помошью redux
  //   name: "popular",
  //   sortProperty: "rating",
  // });

  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchItems = () => {
    setIsLoading(true);
    const sortBy = sort;
    const order = sort;
    const search = searchValue ? `search=${searchValue}` : "";
    axios
      .get(
        `https://6293b734089f87a57ac4de66.mockapi.io/items?page=${currentPage}&limit=6&${
          category > 0 ? `category=${category}` : ""
        }${search}&sortBy=${sortBy}&order=${order}
      }`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params, sort));
    }
    // isSearch.current = true;
  }, []);

  React.useEffect(() => {
    // window.scrollTo(0, 0);
    // if (!isSearch.current) {
    fetchItems();
    // }
    // isSearch.current = false;
  }, [category, sort, searchValue, currentPage]);

  React.useEffect(() => {
    // if (isMounted.current) {
    const queryString = qs.stringify({
      sortProperty: sort,
      category,
      currentPage,
    });
    navigate(`?${queryString}`);
    // }
    // isMounted.current = true;
  }, [category, sort, currentPage]);

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
          : items.map((obj) => (
              <FoodBlock
                key={obj.id}
                id={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
                raiting={obj.raiting}
              />
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => onChangePage(number)}
      />
    </div>
  );
};
export default Home;
