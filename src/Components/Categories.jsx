import React from "react";

function Categories({ category, onClickCategory }) {
  // const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ["All", "Cake", "Ice Cream", "Brownie", "Cupcake", "Pie"];

  // const onClickCategory = (index) => {
  //   setActiveCategory(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => onClickCategory(index)}
            className={category === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
