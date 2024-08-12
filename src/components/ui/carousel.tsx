import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { relative } from "path";

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState<string[]>(slides);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideinterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideinterval);
  }, [autoSlide, autoSlideInterval]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImageURL = URL.createObjectURL(e.target.files[0]);
      setImages((prevImages) => {
        if (prevImages.length < 5) {
          return [...prevImages, newImageURL];
        } else {
          alert("Solo puedes subir 5 imagenes");
          return prevImages;
        }
      });
    }
  };

  return (
    <div 
        className="carousel-container overflow-hidden relative"
        style={{ width: '100%', maxWidth: '100vh', position: 'relative', overflow: 'hidden'}}
    >
      <div
        className="carousel-inner flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)`, transition: 'transform 0.5s ease-out', display: 'flex' }}
      >
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Slide ${index}`}
            className="w-full object-cover h-auto"
            style={{ minWidth: '100%', maxWidth: '100%', height: 'auto' }}  
           />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ArrowLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ArrowRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${curr === i ? "p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
      {user?.role === "ADMIN" && (
        <div className="absolute top-4 right-4">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleAddImage} />
            <Plus
              size={40}
              className="bg-white/80 text-gray-800 p-2 rounded-full"
            />
          </label>
        </div>
      )}
    </div>
  );
}
