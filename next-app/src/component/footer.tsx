export default async function Footer({ params }: { params: { lng: string } }) {
  const { lng } = await params;

  return <footer></footer>;
}
