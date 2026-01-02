 const location = useLocation();

  // Single function to decide which footer to render
  const renderFooter = () => {
    if (location.pathname === "/checkout") return <CheckoutFooter />;
    if (["/product", "/cart"].includes(location.pathname)) return <Footer />;
    return null; // no footer on other pages
  };