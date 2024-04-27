import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import slide1 from '../assets/main.png'
import slide2 from '../assets/main2.png'
import enfermagem from '../assets/enfermagem.jpg'
import adm from '../assets/adm.jpg'
import eletrotecnica from '../assets/eletrotecnica.jpg'
import edificacoes from '../assets/edificacoes.jpg'
import Cards from './Cards';

const Content = () => {
   

    return (
        <div>
            <Swiper navigation={true} modules={[Navigation, Autoplay]} autoplay={{ delay: 4000 }} className="mySwiper">
                <SwiperSlide>
                    <div className="slides">
                        <img src={slide1} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slides">
                        <img src={slide2} alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
            <h1 className='title'>Destaques para você</h1>
            <section className="content"> 
                <Cards img={enfermagem} description={'O curso de enfermagem forma profissionais para fornecer cuidados de saúde em diferentes contextos, visando o bem-estar dos pacientes.'} title={'Enfermagem'} />
                <Cards img={adm} description={'O curso de administração forma líderes empresariais, desenvolvendo habilidades estratégicas e analíticas para gerir organizações com eficácia.'} title={'Administração'} />
                <Cards img={eletrotecnica} description={'A eletrotécnica envolve o projeto e operação de sistemas elétricos para diversos fins, desde geração até utilização de energia.'} title={'Eletrotécnica'} />
                <Cards img={edificacoes} description={'O curso de edificações prepara profissionais para a construção civil, focando em arquitetura, técnicas de projeto e infraestruturas sustentáveis.'} title={'Edificações'} />
            </section>
        </div>
    );
};

export default Content;
