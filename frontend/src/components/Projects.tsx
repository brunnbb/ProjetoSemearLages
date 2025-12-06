import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProjectGallery } from './ProjectGallery';

import qualificarImg from '../assets/project1/qualificar-capa.png';
import encaminhamentoImg from '../assets/project2/mercado-capa.png';
import cursosProfissionalizantesImg from '../assets/project3/curso-capa.png';
import informaticaSemearImg from '../assets/project4/informatica-capa.png';

import project1_1 from '../assets/project1/qualificar1.jpg';
import project1_2 from '../assets/project1/qualificar2.jpg';
import project1_3 from '../assets/project1/qualificar3.jpg';
import project1_4 from '../assets/project1/qualificar4.jpg';
import project1_5 from '../assets/project1/qualificar5.jpg';
import project1_6 from '../assets/project1/qualificar6.jpg';
import project1_7 from '../assets/project1/qualificar7.jpg';

import project2_1 from '../assets/project2/mercado1.jpg';
import project2_2 from '../assets/project2/mercado2.jpg';
import project2_3 from '../assets/project2/mercado3.jpeg';

import project3_1 from '../assets/project3/curso1.jpg';
import project3_2 from '../assets/project3/curso2.jpg';
import project3_3 from '../assets/project3/curso3.jpg';
import project3_4 from '../assets/project3/curso4.jpg';
import project3_5 from '../assets/project3/curso5.jpg';

import project4_1 from '../assets/project4/informatica1.jpg';
import project4_2 from '../assets/project4/informatica2.jpg';
import project4_3 from '../assets/project4/informatica3.jpg';
import project4_4 from '../assets/project4/informatica4.jpg';


export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projects = [
    {
      title: 'Qualificar para Transformar',
      description: 'Aulas aos sábados na Universidade do Planalto Catarinense, onde todos os alunos cadastrados participam. Formados em quatro turmas (infantil, pré-adolescentes, adolescentes e mães), trabalhamos desenvolvimento pessoal, português, matemática, biologia, conhecimentos gerais, prevenção à violência doméstica e familiar, e projeto de vida.',
      image: qualificarImg,
      participants: '165',
      gallery: [
        { src: qualificarImg, alt: 'Aula do projeto Qualificar para Transformar'},
        { src: project1_1, alt: 'Aula do projeto Qualificar para Transformar'},
        { src: project1_2, alt: 'Aula do projeto Qualificar para Transformar' },
        { src: project1_3, alt: 'Aula do projeto Qualificar para Transformar' },
        { src: project1_4, alt: 'Aula do projeto Qualificar para Transformar' },
        { src: project1_5, alt: 'Aula do projeto Qualificar para Transformar' },
        { src: project1_6, alt: 'Aula do projeto Qualificar para Transformar' },
        { src: project1_7, alt: 'Aula do projeto Qualificar para Transformar' },
      ],
    },
    {
      title: 'Encaminhamento para Mercado de Trabalho',
      description: 'Em parceria com o CIEE, o Semear realiza encaminhamento de jovens para programa de aprendizagem. O objetivo central é que não sejam reféns do assistencialismo e possam auferir sua própria renda através do trabalho.',
      image: encaminhamentoImg,
      participants: '40+',
      gallery: [
        { src: encaminhamentoImg, alt: 'Jovens encaminhados ao mercado de trabalho' },
        { src: project2_1, alt: 'Jovens encaminhados ao mercado de trabalho'},
        { src: project2_2, alt: 'Jovens encaminhados ao mercado de trabalho'},
        { src: project2_3, alt: 'Jovens encaminhados ao mercado de trabalho' },
      ],
    },
    {
      title: 'Cursos Profissionalizantes',
      description: 'Aos alunos com bons desempenhos no Qualificar para Transformar, o projeto oferta, em parceria com padrinhos e empresas parceiras, cursos profissionalizantes. Português e matemática no Kumon Centro Lages, inglês na Camden, informática no MIX e esportes, preparando jovens para os desafios do mercado de trabalho.',
      image: cursosProfissionalizantesImg,
      participants: '30+',
      gallery: [
        { src: cursosProfissionalizantesImg, alt: 'Alunos em curso profissionalizante' },
        { src: project3_1, alt: 'Alunos em curso profissionalizante'  },
        { src: project3_2, alt: 'Alunos em curso profissionalizante'  },
        { src: project3_3, alt: 'Alunos em curso profissionalizante'  },
        { src: project3_4, alt: 'Alunos em curso profissionalizante'  },
        { src: project3_5, alt: 'Alunos em curso profissionalizante'  },
      ],
    },
    {
      title: 'Informática Semear + Sistemas Uniplac',
      description: 'Atentos às exigências do mercado referente ao conhecimento da informática, o Semear possui parceria com o curso de Sistemas da Informação da Uniplac, onde os ensinamentos são voltados à prática e ao jovem aprendiz.',
      image: informaticaSemearImg,
      participants: '25+',
      gallery: [
        { src: informaticaSemearImg, alt: 'Laboratório de informática' },
        { src: project4_1, alt: 'Laboratório de informática' },
        { src: project4_2, alt: 'Laboratório de informática' },
        { src: project4_3, alt: 'Laboratório de informática' },
        { src: project4_4, alt: 'Laboratório de informática' },
      ],
    },
  ];

  return (
    <section id="projetos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[#4a90e2] font-bold">Nossos Projetos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos diversos programas de capacitação profissional e desenvolvimento 
            comunitário, focados em gerar oportunidades reais de emprego e renda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col"
              onClick={() => setSelectedProject(index)}
            >
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="mb-3 text-center">{project.title}</h3>
                <p className="text-gray-600 text-sm flex-grow mb-4">{project.description}</p>
                <p className="text-[#4a90e2] text-sm text-center hover:underline">
                  Ver galeria de fotos →
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedProject !== null && (
          <ProjectGallery
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            projectTitle={projects[selectedProject].title}
            images={projects[selectedProject].gallery}
          />
        )}

        {/* Como Fazemos Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 md:p-12">
          <h3 className="text-center mb-8 text-[#7cb342] font-bold">Como Fazemos</h3>
          <p className="text-gray-600 max-w-4xl mx-auto mb-6">
            Realizamos trabalhos, duas vezes ao mês, aos sábados, nas dependências da UNIPLAC, onde dividimos as famílias em turmas de crianças, adolescentes e mães, sendo que cada faixa etária realiza atividades de cunho educacional e profissional, como desenvolvimento de lideranças, projeto de vida, orientações para a primeira entrevista e para primeiro emprego, oratória, educação emocional, informática, conscientização de classe e desafios da adolescência, orientação sexual, violência sexual e doméstica etc.
          </p>
          <p className="text-gray-600 max-w-4xl mx-auto">
            Paralelo a estas atividades, o projeto encaminha os adolescentes a extracurriculares, como esportes, inglês, informática e reforço de português e matemática, semanalmente, com o auxílio de empresas parceiras e padrinhos mantenedores. Além disso, o projeto auxilia as famílias com cesta básica, material e uniforme escolar, atendimento psicológico, encaminhamento a tratamento de saúde e regularização de documentos.
          </p>
        </div>

        {/* Voluntários Section */}
        <div className="mt-16 bg-background rounded-lg p-8 md:p-12">
          <h3 className="text-center mb-8 text-[#2d333b] font-bold">Voluntários</h3>
          <p className="text-gray-600 max-w-4xl mx-auto text-center mb-4">
            O projeto conta com 5 voluntárias em sua Diretoria Executiva, que atuam na organização e administração. Para as atividades contamos com alguns voluntários da comunidade, em especial acadêmicos e beneficiados pelo programa Universidade Gratuita, que fazem possível os trabalhos aos sábados e nos eventos extraordinários do projeto.
          </p>
          <p className="text-center">
            <a 
              href="#contatos"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contatos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#7cb342] hover:text-[#6ca332] font-semibold transition-colors cursor-pointer"
            >
              Quer ser um voluntário? Entre em contato!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}