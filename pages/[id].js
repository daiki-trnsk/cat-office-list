import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getStaticPaths() {
  const req = await fetch(`http://localhost:3000/productsforindex.json`);
  const products = await req.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/productsforindex.json`);
  const products = await req.json();
  const product = products.find((product) => product.id === params.id);

  if (!product) {
    return {
      notFound: true,  // 404ページにリダイレクト
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
        <Link href="/">
          商品一覧へ
        </Link>
      </main>
    </div>
  );
};

export default Product;
