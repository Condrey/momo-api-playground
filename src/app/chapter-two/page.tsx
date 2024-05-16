import BreadCrumb from "@/components/bread-crumb";
import ProductTitleContainer from "@/components/product-title-container";

export default function Page() {
  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Collection", href: "/chapter-two" },
        ]}
      />
      <span className="text-2xl ">Coming soon...!</span>
      {/* <ProductTitleContainer productTitle="Collections" />
      <span className=' before:content-["Create_User:"]'>/apiuser - POST</span> */}
    </>
  );
}
