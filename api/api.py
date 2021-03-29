from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///note.db"
db = SQLAlchemy(app)

class Note(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title= db.Column(db.Text, nullable=False)
    body= db.Column(db.Text, nullable=True)
    latestModified= db.Column(db.DateTime)
    
    
   #string represatention of the model
    def __str__(self):
        return f'{self.id} {self.title} {self.body} {self.latestModified}'

def note_serializer(note):
        return{
        'id': note.id,
        'title': note.title,
        'body': note.body,
        'latestModified': note.latestModified
    }

@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(note_serializer, Note.query.all())])

if __name__=='__main__':
   app.run(debug=True)