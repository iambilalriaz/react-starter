export default function CardTitle({ children }: { children: string }) {
  return <h2 className="md:text-2xl text-lg font-medium text-center text-primary">{children}</h2>;
}
