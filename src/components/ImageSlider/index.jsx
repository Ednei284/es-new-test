import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importar estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageSlider = ({ images, alternativeText }) => {
    if (!Array.isArray(images)) {
        return <img src={images} alt={alternativeText} style={{ borderRadius: '1 rem', backgroundColor: '#504040', width: '100%', height: '300px', objectFit: 'contain' }} />;
    }
    return (
        <div style={{ width: '100%', maxWidth: '300px', margin: ' 0 auto' }}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                style={{ borderRadius: '8px', overflow: 'hidden' }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`${alternativeText}`}
                            style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageSlider;