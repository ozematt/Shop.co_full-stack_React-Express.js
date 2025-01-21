import {
  BrandBar,
  Category,
  Footer,
  Hero,
  Newsletter,
  Testimonials,
  TopRating,
} from "../sections";

const HomePage = () => {
  //
  ////UI
  return (
    <main className="max-container">
      <Hero />
      <BrandBar />
      <TopRating />
      <Category />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default HomePage;
