import Card from '../../components/Card';
import testMemes from './TestMemes';

function RandomMemeView() {
    let data = testMemes();
    return (
        <div className="bg-blue-300 text-black">
            <div>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            image={item.url}
                            title={item.title}
                        ></Card>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default RandomMemeView;
