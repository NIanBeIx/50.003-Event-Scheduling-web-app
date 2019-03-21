import os

class Config(object):
	MAIL_SERVER='smtp.gmail.com'
	MAIL_PORT = 465
	MAIL_USERNAME = 'edricwu98@gmail.com'
	MAIL_PASSWORD = '88cav0566'
	MAIL_DEFAULT_SENDER = 'edricwu98@gmail.com'
	MAIL_USE_TLS = False
	MAIL_USE_SSL = True
	SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'