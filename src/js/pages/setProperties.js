import setPages from "../pages/setPages.js";

class SetProperties {
  setProperties() {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    )
      setPages.setHomePage();

    if (window.location.href.match("categories.html#land")) {
      document.querySelector(".land-category").classList.add("active");
      setPages.propertyType = "Land";
      setPages.setCategoryPage();
    }

    if (window.location.href.match("categories.html#residential")) {
      document.querySelector(".residential-category").classList.add("active");
      setPages.propertyType = "Residential";
      setPages.setCategoryPage();
    }

    if (window.location.href.match("categories.html#commercial")) {
      document.querySelector(".commercial-category").classList.add("active");
      setPages.propertyType = "Commercial";
      setPages.setCategoryPage();
    }

    if (window.location.href.match("categories.html#industrial")) {
      document.querySelector(".industrial-category").classList.add("active");
      setPages.propertyType = "Industrial";
      setPages.setCategoryPage();
    }

    if (window.location.href.match("myproperties.html"))
      setPages.setMyPropertiesPage();
  }
}
export default new SetProperties();
