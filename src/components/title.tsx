interface Props {
  title: string;
}
export default function Title({ title }: Props) {
  return (
    <>
      <span className="text-2xl font-bold uppercase">{title}</span>
    </>
  );
}
