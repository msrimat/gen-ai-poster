import Image from "next/image";
import FormContent from "./components/FormContent";
import Header from "./components/Header";

export default function Home() {
  return (
    <div
      style={{ backgroundColor: "#f0f0f0", fontFamily: "Arial, sans-serif" }}
    >
      <Header />
      <FormContent />
    </div>
  );
}
