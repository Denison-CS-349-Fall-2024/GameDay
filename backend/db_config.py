from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_bcrypt import Bcrypt

DATABASE_URL = "mysql+pymysql://root:Donotter2021$$@localhost/commissioners"  # Replace with your MySQL credentials
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Initialize Bcrypt
bcrypt = Bcrypt()
