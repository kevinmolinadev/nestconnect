

const Pillar = ({ title, content, img }) => {
    return (
        <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <img className="w-1/2" src={img} alt={title} />
            <p className="text-base font-light px-2 text-center">{content}</p>
        </div>
    );
};

export default Pillar;