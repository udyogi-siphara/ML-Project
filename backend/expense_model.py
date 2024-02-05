import pandas as pd

def find_lowest_price(category, item_name):
    # Read the CSV file into a DataFrame
    csv_data = pd.read_csv('dataset.csv')

    # Initialize variables to store the minimum price and corresponding record
    min_price = float('inf')
    min_price_record = None

    # Iterate through the rows of the DataFrame
    for index, row in csv_data.iterrows():
        # Check if the row matches the given category and item name
        if row['category'] == category and row['Name'] == item_name:
            # Convert the price to a float for comparison
            price = float(row['Price'])

            # Update the minimum price and corresponding record if a lower price is found
            if price < min_price:
                min_price = price
                min_price_record = row

    print(min_price_record)

    return min_price_record
