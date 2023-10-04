import Card from '../../components/Card';

function BestMemeView() {
    return (
        <body className="bg-blue-300 text-black h-full w-full fixed">
            <div>
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
        </body>
    );
}

export default BestMemeView;
