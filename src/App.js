import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "./Shared/Navbar";
import "./App.css";
import Layout from "./Shared/Layout";
import Homepage from "./Home/Homepage";

function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <Homepage />
      </Layout>
    </>
  );
}

export default App;
