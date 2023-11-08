from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import pickle

# loading models
df = pickle.load(open('df.pkl','rb'))
similarity = pickle.load(open('similarity.pkl','rb'))


def recommendation(book_df):
    idx = df[df['Book-Title'] == book_df].index[0]
    distances = sorted(list(enumerate(similarity[idx])),reverse=True,key=lambda x:x[1])

    books = []
    for m_id in distances[1:6]:
        books.append(df.iloc[m_id[0]]['Book-Title'])

    return books


app = Flask(__name__)


@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()  # Get JSON data from the request

    book = data['book']

    recommended_books = recommendation(book)  # Process the data using the recommendation function

    # Prepare the response JSON
    response = {
        'message': 'Success',
        'recommended_books': recommended_books
    }

    return jsonify(response)  # Send the JSON response


if __name__ == '__main__':
    app.run()