from contextlib import contextmanager
from flask import Flask
from config import Config
from flask_mail import Mail, Message
import unittest

class TestCase(unittest.TestCase):

    TESTING = True
    MAIL_DEFAULT_SENDER = "support@mysite.com"

    def setUp(self):
        self.app = Flask(__name__)
        self.app.config.from_object(Config)
        self.mail = Mail(self.app)
        self.users = [{'name': 'Edric', 'email': 'edric@mymail.sutd.edu.sg'}, 
        {'name': 'James', 'email': 'jaexp.bots@gmail.com'},
        {'name': 'Yolo', 'email': 'yolo@mymail.sutd.edu.sg'}]
        self.ctx = self.app.test_request_context()
        self.ctx.push()

    def tearDown(self):
        self.ctx.pop()

    @contextmanager
    def mail_config(self, **settings):
        """
        Context manager to alter mail config during a test and restore it after,
        even in case of a failure.
        """
        original = {}
        state = self.mail.state
        for key in settings:
            assert hasattr(state, key)
            original[key] = getattr(state, key)
            setattr(state, key, settings[key])

        yield
        # restore
        for k, v in original.items():
            setattr(state, k, v)

class TestInitialization(TestCase):
    def test_send_message(self):    
        with self.mail.record_messages() as outbox:
            self.mail.send_message(subject='testing',
                      body='test',
                      recipients=["edric@mymail.sutd.edu.sg"])
            self.assertEqual(len(outbox), 1)
            msg = outbox[0]
            self.assertEqual(msg.subject, "testing")
            self.assertEqual(msg.recipients, ["edric@mymail.sutd.edu.sg"])
            self.assertEqual(msg.body, "test")

    def send_email(self,message, subject):
        with self.mail.connect() as conn:
            for user in self.users:
                msg = Message(sender='edricwu98@gmail.com',recipients=[user['email']], body=message, subject=subject)
                conn.send(msg)

    def test_send_message_multiple(self):    
        with self.mail.record_messages() as outbox:
            self.send_email("test", "testing")
            self.assertEqual(len(outbox), len(self.users))
            for i in range (len(outbox)):
                msg = outbox[i]
                self.assertEqual(msg.subject, "testing")
                self.assertEqual(msg.recipients, [self.users[i]['email']])
                self.assertEqual(msg.body, "test")
if __name__ == "__main__":
    unittest.main()