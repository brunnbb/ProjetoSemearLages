"""
Limiter compartilhado para rate limiting em toda a aplicação
"""
from slowapi import Limiter
from slowapi.util import get_remote_address

# Limiter compartilhado para toda a aplicação
limiter = Limiter(key_func=get_remote_address)

