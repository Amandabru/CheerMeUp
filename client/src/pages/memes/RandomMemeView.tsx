import Card from '../../components/Card';
import testMemes from './TestMemes';

function RandomMemeView() {
    let data = testMemes();
    return (
        <div className="bg-blue-300 text-black">
            <div>
                <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
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
