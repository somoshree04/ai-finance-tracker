import sys
import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

import models, schemas, database
import ml_logic.model as ml

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CATEGORY_MAP = {
    "Rent": 8,
    "Loan_Repayment": 6,
    "Insurance": 5,
    "Groceries": 3,
    "Transport": 9,
    "Eating_Out": 0,
    "Entertainment": 2,
    "Utilities": 10,
    "Healthcare": 4,
    "Education": 1,
    "Miscellaneous": 7
}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.User(
        username=user.username, 
        email=user.email, 
        hashed_password=user.password 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/users/{user_id}/expenses/", response_model=schemas.Expense)
def create_expense_for_user(
    user_id: int, expense: schemas.ExpenseCreate, db: Session = Depends(database.get_db)
):
    
    # If the category is unknown, we default to 7 (Miscellaneous)
    cat_id = CATEGORY_MAP.get(expense.category, 7)

    is_anomaly_detected = ml.predict_anomaly(expense.amount, cat_id)

    db_expense = models.Expense(
        **expense.model_dump(),
          owner_id=user_id,
          is_anomaly=is_anomaly_detected          
          )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense