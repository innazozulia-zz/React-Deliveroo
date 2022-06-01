import React from "react";

function FoodBlock({ title, price, imageUrl, sizes, types }) {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

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
          <button className="button button--outline button--ad">
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="16px"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg> */}
            <span>ADD</span>
            <i>0</i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default FoodBlock;
