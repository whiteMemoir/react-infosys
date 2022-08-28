import BooksList from "../components/BooksList";

const Home = () => {
	return (
		<>
			<div class="hero min-h-screen bg-base-200 mt-32">
				<div class="hero-content text-center">
					<h1 class="text-5xl font-bold">Hello there</h1>
					<p class="py-6"></p>
					<button class="btn btn-primary">Get Started</button>
				</div>
			</div>
			<BooksList />
		</>
	);
};

export default Home;
