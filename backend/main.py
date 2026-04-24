from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

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
    db_expense = models.Expense(**expense.model_dump(), owner_id=user_id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense