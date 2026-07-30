import { useState } from "react";
import BrandCard from "../BrandCard/BrandCard";
import { brands } from "../../data/brandData";
import styles from "./AllBrands.module.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function AllBrands() {
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(12);

  const chooseLetter = (letter) => {
    setSelectedLetter(letter);
    setVisibleCount(12);
  };

  const filteredBrands = brands
    .filter((brand) => selectedLetter === "All" || brand.className.charAt(0).toUpperCase() === selectedLetter)
    .sort((first, second) => {
      if (sortBy === "name-asc") return first.lines.join(" ").localeCompare(second.lines.join(" "));
      if (sortBy === "name-desc") return second.lines.join(" ").localeCompare(first.lines.join(" "));
      if (sortBy === "products-low") return first.products - second.products;
      return second.products - first.products;
    });
  const visibleBrands = filteredBrands.slice(0, visibleCount);

  return (
    <section id="all-brands">
      <div aria-label="Filter brands by first letter" className={styles.letters} role="group">
        <button aria-pressed={selectedLetter === "All"} className={selectedLetter === "All" ? styles.active : undefined} onClick={() => chooseLetter("All")} type="button">All</button>
        {letters.map((letter) => <button aria-pressed={selectedLetter === letter} className={selectedLetter === letter ? styles.active : undefined} key={letter} onClick={() => chooseLetter(letter)} type="button">{letter}</button>)}
      </div>
      <div className={styles.allHead}>
        <h2>{selectedLetter === "All" ? "All Brands" : `Brands starting with “${selectedLetter}”`}</h2>
        <label>
          Sort By: <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}><option value="popular">Most Popular</option><option value="name-asc">Name: A–Z</option><option value="name-desc">Name: Z–A</option><option value="products-low">Fewest Products</option></select>
        </label>
      </div>
      {filteredBrands.length === 0 && <div className={styles.empty} role="status"><b>No brands found</b><p>There are currently no brands beginning with “{selectedLetter}”.</p><button onClick={() => chooseLetter("All")} type="button">Show All Brands</button></div>}
      <div className={styles.allGrid}>
        {visibleBrands.map((brand) => (
          <BrandCard brand={brand} compact key={brand.className} />
        ))}
      </div>
      {visibleCount < filteredBrands.length && <button className={styles.load} onClick={() => setVisibleCount((count) => count + 6)} type="button">Load More Brands ⌄</button>}
    </section>
  );
}

export default AllBrands;
