import Flogo from "@/assets/images/full-logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-r from-[#1855CE] to-[#0A1931] py-[50px] px-[60px]">
      <img alt="logo" className="w-[200px] absolute right-[40px]" src={Flogo} />
      {children}
    </div>
  );
}
