import React from "react";

export const Footer = () => (
  <footer className="bg-dark text-light py-3 w-100">
    <div className="container text-center">
      <div className="d-flex flex-wrap justify-content-center gap-3 small mb-2">
        <div>About Us</div>
        <div>Products</div>
        <div>Our Team</div>
        <div>Get Help</div>
        <div>Contact</div>
      </div>

      <hr className="bg-light my-2" style={{ height: "1px", border: "none" }} />

      <div className="d-flex justify-content-center gap-3 fs-5">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-x-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-google-plus-g"></i>
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-pinterest"></i>
      </div>
    </div>
  </footer>
);

export default Footer;
