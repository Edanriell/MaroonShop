import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Sections } from "./sections";

// TODO Div with className will be removed after all section successful development
const IndexPage = () => {
	return (
		<div className="flex flex-col justify-between h-screen">
			<Header />
			<Sections />
			<Footer />
		</div>
	);
};

export default IndexPage;
