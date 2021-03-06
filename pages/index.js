import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Airbnb</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/**NavBar */}
			<Header />
			{/**Banner */}
			<Banner />
		</div>
	);
}
