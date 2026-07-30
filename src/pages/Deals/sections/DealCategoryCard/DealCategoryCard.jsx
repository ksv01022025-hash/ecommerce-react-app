import { Link } from "react-router-dom";

function DealCategoryCard({ category }) {
  return (
    <Link to={`/deals?category=${encodeURIComponent(category.name)}`}>
      <img src={category.image} alt={`${category.name} deals`} />
      <strong>{category.name}</strong>
      <small>{category.count} Deals</small>
    </Link>
  );
}

export default DealCategoryCard;
