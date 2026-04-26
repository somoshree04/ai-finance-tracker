from ml_logic.model import predict_anomaly
import os

def test_brain_logic():
    print(" Testing AI Anomaly Detection...")
    
    if not os.path.exists("anomaly_model.pkl"):
        print(" Error: anomaly_model.pkl not found")
        return

    # Test 1: A normal Rent payment
    normal_rent = 14000
    is_normal_weird = predict_anomaly(normal_rent, 8)
    print(f" Rent ₹{normal_rent}: {'ANOMALY' if is_normal_weird else ' NORMAL'}")

    # Test 2: A  high Rent payment
    huge_rent = 900000 
    is_huge_weird = predict_anomaly(huge_rent, 8)
    print(f" Rent ₹{huge_rent}: {' ANOMALY' if is_huge_weird else 'NORMAL'}")

    # Test 3: A tiny Rent payment (which is also weird for Rent)
    tiny_rent = 5
    is_tiny_weird = predict_anomaly(tiny_rent, 8)
    print(f" Rent ₹{tiny_rent}: {'ANOMALY' if is_tiny_weird else ' NORMAL'}")

if __name__ == "__main__":
    test_brain_logic()
