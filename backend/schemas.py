from pydantic import BaseModel,EmailStr
from typing import List, Optional
from datetime import datetime

class ExpenseBase(BaseModel):
    amount:float
    category:str
    description:str

class ExpenseCreate(ExpenseBase):

    pass #frontend sees while creating a new expense

class Expense(ExpenseBase):
    id:int
    owner_id:int
    is_anomaly:bool
    timestamp:datetime
class Config:
    from_attributes=True


class UserBase(BaseModel):
    username:str
    email:EmailStr

class UserCreate(UserBase):
    password:str

class User(UserBase):
    id:int
    expenses:List[Expense]=[]
class Config:
    from_attributes=True