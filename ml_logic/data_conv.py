import pandas as pd
import os

def prepare_data(csv_name="data.csv"):
    # Everything from here down MUST be indented (pushed right)
    base_path = os.path.dirname(os.path.dirname(__file__))
    file_path = os.path.join(base_path, "data", csv_name)
    
    if not os.path.exists(file_path):
        return f"Error: {csv_name} not found at {file_path}", None

    df = pd.read_csv(file_path)

    spending_cols = [
        'Rent', 'Loan_Repayment', 'Insurance', 'Groceries', 
        'Transport', 'Eating_Out', 'Entertainment', 'Utilities', 
        'Healthcare', 'Education', 'Miscellaneous'
    ]

    melted_df = pd.melt(
        df, 
        value_vars=spending_cols, 
        var_name='category', 
        value_name='amount'
    )

    melted_df['amount'] = melted_df['amount'].fillna(0).astype(float)
    melted_df['category_id'] = melted_df['category'].astype('category').cat.codes
    
    mapping = dict(enumerate(melted_df['category'].astype('category').cat.categories))
    
    return melted_df[['amount', 'category_id']], mapping