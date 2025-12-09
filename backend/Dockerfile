FROM python:3.11-slim

RUN pip install uv

WORKDIR /app

COPY pyproject.toml uv.lock ./

RUN uv sync --no-dev --frozen

COPY . .

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
ENV PYTHONUNBUFFERED=1
