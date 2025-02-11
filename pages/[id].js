import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import path from "path";
import fs from "fs";

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public", "productsforindex.json");
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "public", "productsforindex.json");
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);
  const product = products.find((product) => product.id === params.id);

  if (!product) {
    return {
      notFound: true, // 404ページにリダイレクト
    };
  }

  return {
    props: { product },
  };
}

const Product = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{product.name}のページです</h1>
        <img src={product.image} width="300" height="400" />
        <br />
        <Link href="/">商品一覧へ</Link>
      </main>
    </div>
  );
};

export default Product;
