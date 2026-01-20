import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home({ exploreData, cardsData }) {
	return (
		<div className="">
			<Head>
				<title>Airbnb</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Banner />

			<main className="max-w-7xl mx-auto px-8 sm:px-16">
				<section className="pt-6">
					<h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

					{/* Pull some data from a server - API endpoints */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData?.map(({ img, distance, location }) => (
							<SmallCard
								key={img}
								img={img}
								distance={distance}
								location={location}
							/>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
					<div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
						{cardsData?.map(({ img, title }) => (
							<MediumCard key={img} img={img} title={title} />
						))}
					</div>
				</section>

				<LargeCard
					img="https://links.papareact.com/4cj"
					title="The Greatest Outdoors"
					description="Wishlists curated by Airbnb."
					buttonText="Get Inspired"
				/>
			</main>

			<Footer />
		</div>
	);
}

export async function getStaticProps() {
	let exploreData = [];
	let cardsData = [];

	try {
        // Attempt to fetch from Firebase
        // Note: This requires the Firebase project to be set up and having 'exploreData' and 'cardsData' collections
        // If not configured, it will likely throw an error or return empty, falling back to the API.
		const querySnapshotExplore = await getDocs(collection(db, "exploreData"));
		exploreData = querySnapshotExplore.docs.map((doc) => doc.data());

		const querySnapshotCards = await getDocs(collection(db, "cardsData"));
		cardsData = querySnapshotCards.docs.map((doc) => doc.data());

        // Check if data is empty (meaning maybe collection doesn't exist or is empty), fall back to API
        if (exploreData.length === 0 || cardsData.length === 0) {
            console.log("Firebase data empty, fetching from fallback API...");
            throw new Error("Empty data");
        }

	} catch (error) {
		console.warn("Error fetching from Firebase (using fallback data):", error.message);

        try {
            const exploreDataRes = await fetch("https://links.papareact.com/pyp");
            exploreData = await exploreDataRes.json();

            const cardsDataRes = await fetch("https://links.papareact.com/zp1");
            cardsData = await cardsDataRes.json();
        } catch (apiError) {
             console.error("Fallback API failed", apiError);
        }
	}

	return {
		props: {
			exploreData,
			cardsData,
		},
	};
}
