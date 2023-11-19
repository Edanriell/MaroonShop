import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Sections } from "./sections";

const ShopHistoryPage = () => {
	return (
		<>
			<Header headerUnderline={true} />
			<Sections />
			<Footer />
		</>
	);
};

export default ShopHistoryPage;
