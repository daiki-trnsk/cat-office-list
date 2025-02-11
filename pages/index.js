import styles from "@/styles/Home.module.css";
import ProductLink from "./productlink";
import API_URL from "@/config";

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/productsforindex.json`);
  const products = await res.json();

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
