from ml_logic.data_conv import prepare_data
from ml_logic.model import train_isolation_forest

def start_training():
    print(" Step 1: Cleaning and Melting Data...")
    data, mapping = prepare_data("data.csv")
    
    print(f" Step 2: Training the Isolation Forest on {len(data)} samples...")
    message = train_isolation_forest(data)
    
    print(f" {message}")
    print(" The .pkl file has been created. Now you can run the test!")

if __name__ == "__main__":
    start_training()
