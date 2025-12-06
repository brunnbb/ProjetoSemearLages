import { Heart, Users, Target, TrendingUp } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Solidariedade',
      description: 'Acreditamos no poder de compartilhar. Nossa base é o apoio mútuo, transformando a solidariedade em ações concretas que sustentam o crescimento de cada indivíduo.',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Somos um catalisador de união. Através da colaboração de voluntários, parceiros e beneficiários, construímos juntos um futuro mais justo e forte para toda a região de Lages.',
    },
    {
      icon: Target,
      title: 'Propósito',
      description: 'Ir além da assistência. Nosso foco é a emancipação e a autopercepção, capacitando os jovens para que eles se vejam e se insiram com sucesso no mercado de trabalho e no ensino superior.',
    },
    {
      icon: TrendingUp,
      title: 'Transformação',
      description: 'Geramos mudança real e duradoura. Investindo em educação e profissionalização, quebramos o ciclo da vulnerabilidade, permitindo que nossos beneficiários se tornem protagonistas de suas histórias e de suas famílias.',
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[#e74c3c] font-bold">Sobre o Projeto Semear Lages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O Projeto Semear Lages é uma associação sem fins lucrativos, que tem por objetivo principal a qualificação profissional e a facilitação da inserção ao mercado de trabalho de jovens de famílias em vulnerabilidade social, na cidade de Lages. Com dez anos de trajetória, buscamos retirar as famílias do ciclo de assistencialismo para incluí-los no mercado de trabalho e no estudo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            const iconColors = [
              'bg-[#e74c3c]', // Solidariedade - red
              'bg-[#4a90e2]', // Comunidade - blue
              'bg-[#7cb342]', // Propósito - green
              'bg-[#ffd740]', // Transformação - yellow
            ];
            return (
              <div key={index} className="text-center p-6 transition-all duration-300 hover:scale-105">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${iconColors[index]} text-white rounded-full mb-4 transition-all duration-300 hover:shadow-lg`}>
                  <Icon size={32} />
                </div>
                <h3 className="mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>

        {/* Nossa Missão Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 md:p-12">
          <h3 className="text-center mb-8 text-[#4a90e2] font-bold">Nossa Missão</h3>
          <p className="text-gray-600 text-center max-w-4xl mx-auto mb-8">
            Nossa missão é promover a inclusão social e produtiva de nosso público-alvo (especialmente aqueles no Cadastro Único), oferecendo capacitação de excelência e suporte psicossocial, visando a inserção qualificada no mercado de trabalho e o acesso ao ensino superior, garantindo assim a autossustentabilidade e a melhoria de vida de suas famílias.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="text-4xl text-[#2d333b] mb-2">165</div>
              <div className="text-gray-600">Vidas Impactadas</div>
            </div>
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="text-4xl text-[#2d333b] mb-2">50+</div>
              <div className="text-gray-600">Famílias Atendidas</div>
            </div>
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="text-4xl text-[#2d333b] mb-2">10</div>
              <div className="text-gray-600">Anos de História</div>
            </div>
          </div>
        </div>

        {/* Nossa História Section */}
        <div className="mt-16 bg-background rounded-lg p-8 md:p-12">
          <h3 className="text-center mb-8 text-[#7cb342] font-bold">Nossa História</h3>
          <div className="space-y-4 text-gray-600 max-w-4xl mx-auto">
            <p>
              O Projeto Semear Lages surgiu em dezembro de 2015, quando as fundadoras, Ariane e Jamille, se reuniram para uma campanha de doces, que seriam distribuídos no bairro Habitação. A campanha seguiu anualmente até que, em 2020, arrecadaram mais de 30 mil reais para distribuição de cestas básicas em 8 bairros da cidade.
            </p>
            <p>
              Foi nesse ano que perceberam que o assistencialismo era necessário, mas não era suficiente para quebrar o ciclo de miséria que se instalava em cada casa que levavam aquele alimento.
            </p>
            <p>
              E assim, acreditando que somente a educação e o trabalho seriam pilares de transformação e oportunidade, criaram o Projeto Semear Lages e passaram a atuar, desde 2021, na busca pela inserção dos adolescentes ao mercado de trabalho e aos cursos profissionalizantes.
            </p>
            <p>
              Em 2022, oficializamos o projeto como uma Associação sem fins lucrativos (OSCIP) e hoje atuamos com cerca de 50 famílias, previamente cadastradas, com atividades aos sábados, nas dependências da UNIPLAC, levando conhecimento, oportunidade e a perspectiva de uma vida melhor.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LYi3OLEw958"
                title="Projeto Semear Lages Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}