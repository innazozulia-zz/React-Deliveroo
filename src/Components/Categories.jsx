import React from "react";

function Categories({ category, onClickCategory }) {
  // const [activeCategory, setActiveCategory] = React.useState(0);   переписали с помошью redux

  const categories = ["All", "Cake", "Ice Cream", "Brownie", "Cupcake", "Pie"];

  // const onClickCategory = (index) => {   переписали с помошью redux
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
