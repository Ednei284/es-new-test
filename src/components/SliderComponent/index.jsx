import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { Divider1 } from '../Divider';

const SliderComponent = ({ slides }) => {
    return (<>


        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className={`${styles.slide_container}`}>
                        <img src={slide.image} alt={slide.caption} />
                        <div className={`${styles.caption}`}>
                            <Divider1>{slide.caption}</Divider1>
                            <p>{slide.price ? `R$ ${slide.price.toFixed(2).replace('.', ',')}` : 'Saiba mais'}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
    );
};

export default SliderComponent;
