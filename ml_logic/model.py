import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib
import os

MODEL_PATH = "anomaly_model.pkl"

def train_isolation_forest(data):
    model = IsolationForest(contamination=0.05, random_state=42)
    
    model.fit(data)
    
    joblib.dump(model, MODEL_PATH)
    return "Model trained and saved as anomaly_model.pkl"

def predict_anomaly(amount, category_id):
    if not os.path.exists(MODEL_PATH):
        return False
    
    model = joblib.load(MODEL_PATH)
    
    test_data = pd.DataFrame([[amount, category_id]], columns=['amount', 'category_id'])
    
    prediction = model.predict(test_data)
    return True if prediction[0] == -1 else False