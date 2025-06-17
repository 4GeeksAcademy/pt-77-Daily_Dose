export const Footer = () => (
	<footer className="footer mx-auto text-center h-25">
		<div className=" mx-auto  bg-dark text-light w-100">
			<div className="row">
				<div className=" d-flex mx-auto justify-content-around">
					<div>About us</div>
					<div>Products</div>
					<div>Our Team</div>
					<div>Get Help</div>
					<div>Contact</div>
				</div>
				<hr></hr>
				<div className="pt-2 pb-2 text-center">
					<span>All music used in this content is the property of its respective owners. We do not claim ownership of any copyrighted music featured herein. All rights belong to the original artists and copyright holders.</span>
					<hr className="bg-light my-2" style={{ height: '1px', border: 'none' }} />
				</div>
			</div>
		</div>
		<div className="col-4 fs-2 d-flex mx-auto justify-content-around text-light bg-dark w-100">
			<i class="fa-brands fa-facebook"></i>
			<i class="fa-brands fa-x-twitter"></i>
			<i class="fa-brands fa-instagram"></i>
			<i class="fa-brands fa-google-plus-g"></i>
			<i class="fa-brands fa-linkedin"></i>
			<i class="fa-brands fa-pinterest"></i>
		</div>
	</footer>
);
export default Footer;