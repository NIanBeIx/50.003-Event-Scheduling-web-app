from flask import Flask, render_template, flash, redirect
from config import Config
from forms import LoginForm
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_login import LoginManager, current_user, login_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
user_data = {}

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Miguel'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    flash(current_user)
    return render_template('index.html', title='Home', user=user, posts=posts)

@app.route('/login', methods = ['GET', 'POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
        #user_data[form.username.data] = generate_password_hash(form.password.data)
		flash("Login successful for user {}, remember_me = {}" .format(form.username.data,form.password.data))
		return redirect('/index')
	return render_template('login.html', title = "Sign In", form = form)



if __name__ == "__main__":
    app.run(debug = True)  
