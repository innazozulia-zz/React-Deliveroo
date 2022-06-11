import React from "react";

import qs from "qs";
import { useNavigate } from "react-router-dom";

import Sort, { sortList } from "../Components/Sort";
import Error from "../Components/Error";
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
import { fetchItems } from "../redux/slices/foodSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = useSelector((state) => state.filter.category);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  // const { category, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector((state) => state.food);

  const { searchValue } = React.useContext(AppContext);
  const isMounted = React.useRef(false);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [items, setItems] = React.useState([]);
  // const isSearch = React.useRef(false);
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

  const getItems = async () => {
    const sortBy = sort;
    const order = sort;
    const search = searchValue ? `search=${searchValue}` : "";
    dispatch(
      fetchItems({
        sortBy,
        order,
        search,
        category,
        currentPage,
      })
    );
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
    getItems();
    // }
    // isSearch.current = false;
  }, [category, sort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort,
        category,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sort, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <LoadingFoodBlog key={index} />
  ));
  const itemsList = items.map((obj) => (
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
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All food</h2>
      {status === "error" ? (
        <Error />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : itemsList}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => onChangePage(number)}
      />
    </div>
  );
};
export default Home;
