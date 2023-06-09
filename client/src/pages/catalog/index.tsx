import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Sections } from "./sections";

const IndexPage = () => {
	return (
		<>
			<Header headerUnderline={true} />
			<Sections />
			<Footer />
		</>
	);
};

export default IndexPage;
