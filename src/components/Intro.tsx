import ejemplo1 from "../assets/ejemplo1.jpg";
import ejemplo2 from "../assets/ejemplo2.jpg";

const IntroSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                    Landing-Page pre ensamblada
                <span className="bg-gradient-to-r from-green-500 to-cyan-800 text-transparent bg-clip-text">
                    {" "}
                    para x
                </span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus sequi beatae inventore laboriosam non dicta, aperiam labore nihil doloribus sint, quaerat consequatur atque earum vero eveniet nulla accusantium quis debitis.
            </p>
            <div className="flex justify-center my-10">
                <a 
                    href="#"
                    className="bg-gradient-to-r from-green-500 to-green-800 py-3 px-4 mx-3 rounded-md"
                >   
                    Start for free
                </a>
                <a href="#" className="py-3 px-4 mx-3 rounded-md border">
                    Documentation
                </a>
            </div>
            <div className="flex mt-10 justify-center">
                <image className="rounded-lg w-1/2 border border-green-700 shadow-sm shadow-green-400 mx-2 my-4">
                    <img src={ejemplo1} alt="ejp1" />
                </image>
                <image className="rounded-lg w-1/2 border border-green-700 shadow-sm shadow-green-400 mx-2 my-4">
                    <img src={ejemplo2} alt="ejp2"/>
                </image>
            </div>
        </div>
    )
}

export default IntroSection;