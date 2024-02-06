# from flask_pymongo import pymongo
# from pymongo.collection import Collection
# from pymongo.results import InsertOneResult

# class User:
#     def __init__(self, db: pymongo.database.Database):
#         self.collection: Collection = db['users']

#     def signup(self, username: str, password: str) -> InsertOneResult:
#         return self.collection.insert_one({'username': username, 'password': password})

#     def login(self, username: str, password: str) -> dict:
#         return self.collection.find_one({'username': username, 'password': password})
