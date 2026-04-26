from ml_logic.data_conv import prepare_data

def test_conversion():
    print(" Testing Data Conversion...")
    
    data, mapping = prepare_data("data.csv")    
    if data is None or isinstance(data, str):
        print(f"Test Failed: {data}")
        return

    print(f" Success! Data converted.")
    print(f"New Dataset Shape: {data.shape}") 
    
    print("\n First 5 rows of transformed data:")
    print(data.head())
    
    print("\n Category Mapping found:")
    for cid, name in mapping.items():
        print(f"ID {cid}: {name}")

    print(f"\n Max Amount found: {data['amount'].max()}")
    print(f" Min Amount found: {data['amount'].min()}")

if __name__ == "__main__":
    test_conversion()
