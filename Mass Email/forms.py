from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
	subject = StringField("Subject", validators = [DataRequired()])
	message = TextAreaField("Message", render_kw={"rows": 10, "cols": 100}, validators = [DataRequired()])
	send_emails = SubmitField("Send Emails")