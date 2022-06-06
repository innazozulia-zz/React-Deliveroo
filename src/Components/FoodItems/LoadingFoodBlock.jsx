import React from "react";
import ContentLoader from "react-content-loader";

const LoadingFoodBlog = (props) => (
  <ContentLoader
    className="food__block"
    speed={2}
    width={300}
    height={420}
    viewBox="0 0 350 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="9" ry="9" width="260" height="126" />
    <rect x="1" y="197" rx="10" ry="10" width="260" height="79" />
    <rect x="180" y="287" rx="8" ry="8" width="82" height="44" />
    <rect x="0" y="287" rx="8" ry="8" width="82" height="44" />
    <rect x="" y="151" rx="7" ry="7" width="260" height="29" />
  </ContentLoader>
);

export default LoadingFoodBlog;
