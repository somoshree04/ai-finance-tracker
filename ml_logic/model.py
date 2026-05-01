import pandas as pd
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "anomaly_model.pkl")

def predict_anomaly(amount, category_id):
    if not os.path.exists(MODEL_PATH):
        print(f"MODEL ERROR: Looking for model at {MODEL_PATH} but not found!")
        return False
    
    # Loading the model
    model = joblib.load(MODEL_PATH)
    
    # Predict
    test_data = pd.DataFrame([[amount, category_id]], columns=['amount', 'category_id'])
    prediction = model.predict(test_data)
    
    # Isolation Forest returns -1 for anomalies
    return True if prediction[0] == -1 else False