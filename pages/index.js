import styles from "@/styles/Home.module.css";
import ProductLink from "./productlink";
import path from "path";
import fs from "fs";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "productsforindex.json");
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);

  return {
    props: {
      products,
    },
  };
}

const ProductsList = ({ products }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>商品一覧</h2>
        {products.map((product) => (
          <ProductLink
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductsList;
