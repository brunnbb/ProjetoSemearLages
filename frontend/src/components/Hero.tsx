import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import heroImg1 from '../assets/hero/hero1.png';
import heroImg2 from '../assets/hero/hero2.jpg';
import heroImg3 from '../assets/hero/hero3.jpg';
import heroImg4 from '../assets/hero/hero4.png';
import heroImg5 from '../assets/hero/hero5.jpg';
import heroImg6 from '../assets/hero/hero6.png';
import heroImg7 from '../assets/hero/hero7.png';
import heroImg8 from '../assets/hero/hero8.png';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImages = [
    {
      src: heroImg1,
      alt: "Criança participante do projeto com atividade artesanal"
    },
    {
      src: heroImg2,
      alt: "Grupo de crianças participantes do Projeto Semear Lages"
    },
    {
      src: heroImg3,
      alt: "Criança participante do projeto com atividade artesanal"
    },
    {
      src: heroImg4,
      alt: "Grupo de crianças e adolescentes sorrindo para a câmera"
    },
    {
      src: heroImg5,
      alt: "Criança brincando em uma piscina de bolinhas"
    },
    {
      src: heroImg6,
      alt: "Jovem participante no laboratório de informática"
    },
    {
      src: heroImg7,
      alt: "Criança feliz durante atividade do projeto"
    },
    {
      src: heroImg8,
      alt: "Aula de biologia"
    }
  ];

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <Carousel className="absolute inset-0 w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[600px]">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#2d333b]/70"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-[#4a90e2] text-[#4a90e2] hover:text-[#4a90e2]" />
        <CarouselNext className="right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-[#4a90e2] text-[#4a90e2] hover:text-[#4a90e2]" />
      </Carousel>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="mb-6">SEMEAR - QUALIFICAR PARA TRANSFORMAR</h1>
        <p className="text-xl mb-8 text-gray-200">
          Plantando qualificação educacional e profissional, para colher um futuro de novas expectativas nos nossos jovens! Uma União que Transforma Vidas e Fortalece a Comunidade.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={() => scrollToSection('doar')}
            size="lg"
            className="bg-[#7cb342] text-white hover:bg-[#6ca332] transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Faça uma Doação
          </Button>
          <Button 
            onClick={() => scrollToSection('sobre')}
            size="lg"
            variant="outline"
            className="border-2 border-[#ffd740] bg-white/10 backdrop-blur-sm text-[#ffd740] hover:bg-[#ffd740] hover:text-[#2d333b] transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
}