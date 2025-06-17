export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="col-8 mx-auto border rounded bg-light bg-opacity-75">
			<div className="row">
				<div className=" d-flex p-3 mx-auto justify-content-around">
					<div>About us</div>
					<div>Products</div>
					<div>Our Team</div>
					<div>Get Help</div>
					<div>Contact</div>
				</div>
				<hr></hr>
					<div className="pt-2 pb-2">
						<span>All music used in this content is the property of its respective owners. We do not claim ownership of any copyrighted music featured herein. All rights belong to the original artists and copyright holders.</span>
					</div>
			</div>
		</div>
		<div className="col-4 fs-2 d-flex mx-auto justify-content-around p-2 mt-3 text-light bg-dark bg-opacity-75 border rounded">
				<i class="fa-brands fa-facebook"></i>
				<i class="fa-brands fa-x-twitter"></i>
				<i class="fa-brands fa-instagram"></i>
				<i class="fa-brands fa-google-plus-g"></i>
				<i class="fa-brands fa-linkedin"></i>
				<i class="fa-brands fa-pinterest"></i>
			</div>
			<div className="mx-auto text-light">
				© 2025 [Www.DailyDose.Com]. All rights reserved
			</div>
	</footer>
);
export default Footer;