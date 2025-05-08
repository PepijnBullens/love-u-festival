import Header from "@/component/header";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <>
      <Header params={params} currentPage="information" />
      {children}
    </>
  );
}
