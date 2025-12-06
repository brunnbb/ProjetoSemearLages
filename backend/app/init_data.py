"""
Script para inicializar dados iniciais no banco de dados
"""
from app.database import SessionLocal, News
from datetime import date

def init_data():
    db = SessionLocal()
    try:
        # Check if data already exists
        existing_news = db.query(News).first()
        if existing_news:
            print("Dados já inicializados. Pulando...")
            return

        # Create initial news
        news_items = [
            News(
                title='Formatura de 30 novos profissionais em Culinária',
                excerpt='Celebramos a formatura de mais uma turma do curso de Culinária Profissional.',
                content='Na última sexta-feira, o Projeto Semear Lages realizou a cerimônia de formatura de 30 novos profissionais em Culinária. A turma, que iniciou o curso há 6 meses, demonstrou grande dedicação e habilidade durante todo o período de aprendizado.',
                date=date(2024, 10, 15)
            ),
            News(
                title='Novo laboratório de Informática inaugurado',
                excerpt='Graças às doações recebidas, inauguramos um novo laboratório com 20 computadores modernos.',
                content='O Projeto Semear Lages dá mais um passo importante em sua missão de capacitação profissional. Com o apoio de parceiros e doadores, foi inaugurado um novo laboratório de informática equipado com 20 computadores de última geração.',
                date=date(2024, 10, 8)
            ),
            News(
                title='Parceria com empresas locais gera 15 empregos',
                excerpt='Nossa parceria com empresas da região resultou na contratação de 15 ex-alunos.',
                content='O trabalho de networking e relacionamento com empresas locais está dando frutos. Nas últimas semanas, 15 ex-alunos do Projeto Semear Lages foram contratados por empresas parceiras, em diversas áreas como gastronomia, tecnologia e costura.',
                date=date(2024, 9, 28)
            ),
        ]

        for news in news_items:
            db.add(news)

        db.commit()
        print("Dados iniciais criados com sucesso!")
    except Exception as e:
        print(f"Erro ao inicializar dados: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_data()

