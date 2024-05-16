interface Props {
  productTitle: string;
}
export default function ProductTitleContainer({ productTitle }: Props) {
  return (
    <p className='mb-6 max-w-prose rounded-md border bg-slate-200 px-4 py-12 before:uppercase before:content-["Product:"] dark:bg-secondary'>
      {productTitle}
    </p>
  );
}
