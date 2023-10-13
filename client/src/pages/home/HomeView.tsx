import Card from '../../components/Card';

function HomeView() {
    return (
        <div className="bg-pink-300 text-black h-full w-full fixed">
            <div>
                <h1>
                    Home page in progress, not sure how to structure this page
                    yet so im moving on to the meme page
                </h1>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* First Card*/}
                    <Card image="/src/images/shoe.jpeg" />
                    {/* Second Card*/}
                    <Card image="/src/images/cute.avif" />
                    {/* Third Card*/}
                    <Card image="/src/images/queen.png" />
                    {/* First Card*/}
                    <Card image="/src/images/shoe.jpeg" />
                    {/* Second Card*/}
                    <Card image="/src/images/cute.avif" />
                    {/* Third Card*/}
                    <Card image="/src/images/queen.png" />
                </section>
            </div>
        </div>
    );
}

export default HomeView;
