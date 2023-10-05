import Card from '../../components/Card';

function BestMemeView() {
    return (
        <body className="bg-blue-300 text-black">
            <div>
                <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
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
