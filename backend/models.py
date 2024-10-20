from sqlalchemy import Column, Integer, String, TIMESTAMP, func
from db_config import Base

class Commissioner(Base):
    __tablename__ = 'commissioner'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

