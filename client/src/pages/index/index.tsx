import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
// import { Sections } from "./sections";

const IndexPage = () => {
	return (
		<div className="flex flex-col justify-between h-screen">
			<Header />
			<Footer />
		</div>
	);
};

export default IndexPage;
