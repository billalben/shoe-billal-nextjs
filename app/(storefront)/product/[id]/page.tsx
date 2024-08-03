export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}
