import type { V2_MetaFunction } from "@remix-run/node";
import Footer from "~/layout/Footer";
import Header from "~/layout/Header";
import Hero from "~/layout/Hero";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
