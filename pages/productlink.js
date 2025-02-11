import Link from "next/link";

const ProductLink = ({ id, name, image }) => {
  return (
    <Link href={`/${id}`}>
      <div>
        <img src={image} width="300" height="400"/>
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default ProductLink;
