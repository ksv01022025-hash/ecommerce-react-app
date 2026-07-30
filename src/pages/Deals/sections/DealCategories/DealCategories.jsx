import { Link } from "react-router-dom";
import { useGetDealCategoriesQuery } from "../../../../redux/api/dealsApi";
import DealCategoryCard from "../DealCategoryCard/DealCategoryCard";
import styles from "./DealCategories.module.css";

function DealCategories() {
  const { data, error, isLoading } = useGetDealCategoriesQuery();

  if (isLoading) return <p className={styles.status}>Loading deal categories…</p>;
  if (error) return <p className={styles.status} role="alert">Unable to load deal categories.</p>;

  return (
    <section className={styles.dealCats}>
      <Link className={styles.all} to="/deals"><b>%</b><strong>All Deals</strong><small>{data?.count ?? 0} Deals</small></Link>
      {(data?.categories ?? []).map((category) => (
        <DealCategoryCard category={category} key={category.slug} />
      ))}
    </section>
  );
}

export default DealCategories;
