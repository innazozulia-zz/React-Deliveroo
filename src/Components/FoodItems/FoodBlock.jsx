import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../redux/slices/cartSlice.js";

function FoodBlock({ id, title, price, imageUrl, sizes, types, raiting }) {
  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: activeType,
      size: activeSize,
    };
    dispatch(addItem(item));
  };

  const typeNames = ["portion", "cake"];

  const onClickSize = (index) => {
    setActiveSize(index);
  };
  const onClickType = (index) => {
    setActiveType(index);
  };

  return (
    <div className="food__block">
      <div className="block">
        <img width={250} height={150} src={imageUrl} alt="food" />
        <h4 className="block__title">{title}</h4>
        <div className="block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => onClickType(index)}
                className={activeType === index ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => onClickSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} g
              </li>
            ))}
          </ul>
        </div>
        <div className="block__add">
          <div className="block__price">from {price} $</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--ad"
          >
            <span>ADD</span>
            <i>0</i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default FoodBlock;
