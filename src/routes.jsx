import { Routes, Route } from "react-router-dom";
import { Enterprises } from "./pages/Enterprises";
import { ProductsVendor } from "./pages/ProductsVendor";
import { VendorDetails } from "./pages/VendorDetails";
import { News } from "./pages/News";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Politics } from "./pages/Politics";
import { ProductDetails } from "./pages/ProductDetails";
import { Where } from "./pages/Where";
import { WhereDetails } from "./pages/WhereDetails";
import { Cookies } from "./pages/Cookies";

export function AppRoutes() {
  return (
    <Routes>
      {/* main */}
      <Route path="/" element={<Home />} />
      <Route path="/noticias" element={<News />} />
      <Route path="/onde" element={<Where />} />
      <Route path="/onde/:slide_caption" element={<WhereDetails />} />
      <Route path="/empreendimentos" element={<Enterprises />} />

      {/*  vendors and products */}
      <Route
        path="/:vendor_name/:vendor_id"
        element={<ProductsVendor />}
      />
      <Route
        path="/:vendor_name/:vendor_id/detalhes"
        element={<VendorDetails />}
      />
      <Route
        path="/:vendor_name/:vendor_id/:product_name/:product_id/"
        element={<ProductDetails />}
      />

      {/* politics */}
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/politicas" element={<Politics />} />

      {/* error */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
