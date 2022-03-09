from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests


app = Flask(__name__)
CORS(app)

dataset = pd.read_csv('Industry Skills.csv') 
udemy = pd.read_csv('udemy.csv')

classifier = joblib.load('./model/pipeline.pkl')


@app.route("/<name>")
def home(name):
     return f'{name}'


@app.route('/predict', methods=['POST'])
def predict():
    json_ = request.get_json()
    print("here")  

    pred= classifier.predict([[json_['industry'],json_['skill']]])  

    print(pred[0])

    return jsonify({'pred': int(pred[0])})


           
@app.route('/show', methods =['POST'])
def show():
    json_=request.get_json()
    industries = []
    print(json_)
    for x in json_['list']:
        industry = list(set(dataset.loc[(dataset['skill_group_rank']==1) & (dataset['skill_group_name']==x)]['industry_name'].values))
        print(industry)
        for ind in industry:
            i = ind
            ind= ind.split()[0]
            print(udemy.head())
            course =  udemy.loc[udemy['title'].str.lower().str.contains(ind.lower())].values
            print(course)
            if len(course)==0:
                link = "https://www.udemy.com/course/insights-into-integrity-ethics-and-morality-for-leaders/"
                title = "Leadership Ethics and Integrity: A Comprehensive Guide !"
            else:
                link  = "https://www.udemy.com/course" + course[0][2]
                title = course[0][1]

            

            
            industries.append({
                "industry":i,
                "title": title,
                "url": link
            })
    
    print(industries)      
    return jsonify({'industries': industries})




    

if __name__ == "__main__":
    classifier = joblib.load('./model/pipeline.pkl')
    app.run(debug=True)

