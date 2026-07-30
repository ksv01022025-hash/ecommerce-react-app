import { useSearchParams } from "react-router-dom";
import { brands, categories, colors, priceRanges, ratingCounts, sizes } from "../../data/filterData";
import styles from "./ShopFilters.module.css";

const listValue = (params, key) => (params.get(key) || "").split(",").filter(Boolean);

function CheckboxGroup({ title, options, param, selected, toggle }) {
  return <section><h3>{title} <span>⌃</span></h3>{options.map(([label, count]) => <label key={label}><input checked={selected.includes(label)} onChange={() => toggle(param, label)} type="checkbox" /> <span>{label}</span><small>({count})</small></label>)}</section>;
}

function ShopFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategories = listValue(searchParams, "category");
  const selectedBrands = listValue(searchParams, "brand");
  const selectedSizes = listValue(searchParams, "size");
  const selectedColors = listValue(searchParams, "color");
  const selectedRating = searchParams.get("rating") || "";

  const update = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key));
    setSearchParams(next);
  };
  const toggle = (key, value) => {
    const values = listValue(searchParams, key);
    update({ [key]: values.includes(value) ? values.filter((item) => item !== value).join(",") : [...values, value].join(",") });
  };
  const clearAll = () => {
    const next = new URLSearchParams(searchParams);
    ["category", "brand", "color", "size", "minPrice", "maxPrice", "rating"].forEach((key) => next.delete(key));
    setSearchParams(next);
  };
  const selectedPrice = priceRanges.find((range) => String(range.min ?? "") === (searchParams.get("minPrice") || "") && String(range.max ?? "") === (searchParams.get("maxPrice") || ""));

  return (
    <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.filterTitle}><b>Filters</b><button onClick={clearAll} type="button">Clear All</button></div>
      <CheckboxGroup options={categories} param="category" selected={selectedCategories} title="Category" toggle={toggle} />
      <section><h3>Price <span>⌃</span></h3><div className={styles.pricePills}>{priceRanges.map((range) => <button aria-pressed={selectedPrice?.label === range.label} className={selectedPrice?.label === range.label ? styles.selected : undefined} key={range.label} onClick={() => update(selectedPrice?.label === range.label ? { minPrice: "", maxPrice: "" } : { minPrice: range.min ?? "", maxPrice: range.max ?? "" })} type="button">{range.label}</button>)}</div></section>
      <CheckboxGroup options={brands} param="brand" selected={selectedBrands} title="Brand" toggle={toggle} />
      <section><h3>Color <span>⌃</span></h3><div className={styles.swatches}>{colors.map((color) => <button aria-label={color} aria-pressed={selectedColors.includes(color)} className={selectedColors.includes(color) ? styles.selected : undefined} key={color} onClick={() => toggle("color", color)} style={{ "--swatch": color.toLowerCase() }} title={color} type="button" />)}</div></section>
      <section><h3>Size <span>⌃</span></h3><div className={styles.sizes}>{sizes.map((size) => <button aria-pressed={selectedSizes.includes(size)} className={selectedSizes.includes(size) ? styles.selected : undefined} onClick={() => toggle("size", size)} type="button" key={size}>{size}</button>)}</div></section>
      <section className={styles.ratings}><h3>Rating <span>⌃</span></h3>{ratingCounts.map((count, index) => { const rating = String(5 - index); return <label key={rating}><input checked={selectedRating === rating} onChange={() => update({ rating: selectedRating === rating ? "" : rating })} type="checkbox" /><b>{"★".repeat(Number(rating))}<i>{"★".repeat(5 - Number(rating))}</i></b><small>({String(count).padStart(2, "0")})</small></label>; })}</section>
    </form>
  );
}

export default ShopFilters;
