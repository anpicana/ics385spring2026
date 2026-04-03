# Week11 Assignment: PyMongo Script
# Allana Nicole Picana

import pymongo

# Connect to local MongoDB server
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

# select or create a database
mydb = myclient[ics385_week11]


### Simple PyMongo script that performs CRUD operations on Customer collection ###

# 1. Create collection called Customer
mycollection = mydb[Customer]

# 2. Delete all records in the Customer colection to clean up the db
mycollection.delete_many({})

# 3. Insert Many to insert 3 separate customer reords into the Customer collection
mylist = [
    { "firstName": "Nicole", "lastName": "Oris", "email": "nicole.oris@example.com", "phone": "808-123-4567" },
    { "firstName": "Annika", "lastName": "Frayres", "email": "annie.fray@example.com", "phone": "808-987-6543" },
    { "fistName:": "Joshua", "lastName": "Munar", "email": "j.munar@example.com", "phone": "808-555-1234"}
]

# 4. Update one customer's email to a different email, update another customer's phne # to a different phone #
mycollection.update_one({ "firstName": "Nicole" }, { "$set": { "email": "nic_oris@example.com" } })
mycollection.update_one({ "firstName": "Joshua" }, { "$set": { "phone": "808-555-4321"}})

# 5. Query one customer based on last name, and query another customer based on first name
myquery = { "lastName": "Frayres" }
mydoc = mycollection.find(myquery)
for x in mydoc:
    print(x)

myquery = { "firstName": "Nicole" }
mydoc = mycollection.find(myquery)
for x in mydoc:
    print(x)

# 6. Drop Collectiion called Customer
mycollection.drop()