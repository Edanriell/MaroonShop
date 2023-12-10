export type ContactsProps = {
	title: string;
	contactsProperties?: ContactsSectionProperties;
};

type ContactsSectionProperties = {
	title: string;
	street?: string;
	city?: string;
	phoneNumber?: string;
	phoneNumberHref?: string;
	emailAddress?: string;
	emailAddressHref?: string;
	coordinates?: [number, number];
};
