from flask import Flask, render_template, flash, redirect
from flask_mail import Mail, Message
from forms import LoginForm
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

mail = Mail(app)
users = [{'name': 'Edric', 'email': 'edric@mymail.sutd.edu.sg'}, {'name': 'James', 'email': 'jaexp.bots@gmail.com'}]
def send_email(mail, message, subject):
	with mail.connect() as conn:
		for user in users:
		    msg = Message(sender='edricwu98@gmail.com',recipients=[user['email']], body=message, subject=subject)
		    conn.send(msg)

@app.route('/', methods = ['GET', 'POST'])
@app.route('/index', methods = ['GET', 'POST'])
def index():
	form = LoginForm()
	if form.validate_on_submit():
		send_email(mail, form.message.data, form.subject.data)
		return render_template('new.html')
	return render_template('login.html', title='Home', form = form)


if __name__ == "__main__":
    app.run(debug = True)  