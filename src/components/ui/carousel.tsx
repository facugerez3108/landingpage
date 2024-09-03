import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { uploadImage, getImages, deleteImage } from "../../actions";

type Image = {
  id: number;
  fileName: string;
};

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}) {
  const [curr, setCurr] = useState(0);
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState<Image[]>([]);  // <-- Cambiado a Image[]

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImages();
        console.log('Fetched Images:', fetchedImages); // <-- Verifica la estructura aquí
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error al cargar las imágenes", error);
      }
    };
    
    fetchImages();
  }, []);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  
  useEffect(() => {
    if (!autoSlide) return;
    const slideinterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideinterval);
  }, [autoSlide, autoSlideInterval]);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const response = await uploadImage(file);
        setImages((prev) => {
          if(prev.length < 5) {
            return [...prev, response.image];
          } else {
            alert("Solo se puede subir 5 imágenes");
            return prev;
          }
        });
      } catch(error) {
        console.error("Error al subir la imagen", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteImage(id);
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error al borrar la imagen", error);
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
        {images.length > 0 ? (  // Solo renderizamos las imágenes si existen
          images.map((img, index) => (
            <img 
              key={index} 
              src={`http://localhost:3000/assets/${img.fileName}`} 
              alt={`Slide ${index}`}
              className="w-full object-cover h-auto"
              style={{ minWidth: '100%', maxWidth: '100%', height: 'auto' }}  
            />
          ))
        ) : (
          <p>No images available</p>  // Mensaje alternativo si no hay imágenes
        )}
      </div>
      {images.length > 1 && (  // Mostramos los controles solo si hay más de una imagen
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
      )}
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
        <div className="absolute top-4 right-4 flex space-x-2">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleAddImage} />
            <Plus
              size={40}
              className="bg-white/80 text-gray-800 p-2 rounded-full"
            />
          </label>
          <label className="cursor-pointer">
            <button onClick={() => handleDelete(images[curr].id)}> 
              <Trash2 
                  size={40}
                  className="bg-white/80 text-gray-800 p-2 rounded-full"
              />
            </button>
          </label>
        </div>
      )}
    </div>
  );
}