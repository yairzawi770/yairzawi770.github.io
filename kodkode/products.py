discount_percent = float(input("Enter discount percentage: "))

product1_name = input("Enter name of first product: ")
product1_price = float(input("Enter price of first product: "))

product2_name = input("Enter name of second product: ")
product2_price = float(input("Enter price of second product: "))

product3_name = input("Enter name of third product: ")
product3_price = float(input("Enter price of third product: "))

discount_factor = (100 - discount_percent) / 100

price1_after = product1_price * discount_factor
price2_after = product2_price * discount_factor
price3_after = product3_price * discount_factor

print("\n--- Price List After Discount ---")
print(f"{product1_name}: {product1_price} → {price1_after:.2f}")
print(f"{product2_name}: {product2_price} → {price2_after:.2f}")
print(f"{product3_name}: {product3_price} → {price3_after:.2f}")