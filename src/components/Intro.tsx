import ejemplo1 from "../assets/ejemplo1.jpg";
import ejemplo2 from "../assets/ejemplo2.jpg";
import Carousel from "./ui/carousel";

const IntroSection = () => {
  const slides = [ejemplo1, ejemplo2];

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Lorem ipson dolor
        <span className="bg-gradient-to-r from-green-500 to-cyan-800 text-transparent bg-clip-text">
          {" "}
          sit amet
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
      <Carousel />
    </div>
  );
};

export default IntroSection;