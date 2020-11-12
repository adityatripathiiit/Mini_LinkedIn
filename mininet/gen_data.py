import random
import string
import names
from faker import Faker
import pickle

fake = Faker()

MAX_USERS = 100

def random_char(y):
       return ''.join(random.choice(string.ascii_letters) for x in range(y))

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return(result_str)

email_file = open("./workload/emails.txt", "wb")
email = []
first_name_file = open("./workload/fnames.txt", "wb")
last_name_file = open("./workload/lnames.txt", "wb")

password_file = open("./workload/password.txt", "wb")
status_file = open("./workload/status.txt", "wb")
title_file = open("./workload/title.txt", "wb")
address_file = open("./workload/address.txt", "wb")
index_file = open("./workload/index.txt", "wb")
content_file = open("./workload/content.txt", "wb")

fname = []
lname = []

password = []
status = []
title = []
address = []
index = []
content = []

for i in range(MAX_USERS):
    email.append(random_char(7)+"@gmail.com")
    fname.append(names.get_first_name())
    lname.append(names.get_last_name())
    password.append(get_random_string(8))
    status.append(get_random_string(10))
    title.append("This is "+ str(i)+ "th user on MiniLinkedIn")
    address.append(fake.address())
    index.append(0)
    content.append(fake.text())



pickle.dump(email, email_file)
email_file.close()

pickle.dump(fname, first_name_file)
first_name_file.close()

pickle.dump(lname, last_name_file)
# last_name_file.write(lname)
last_name_file.close()

pickle.dump(password, password_file)
password_file.close()

pickle.dump(status, status_file)
# status_file.write(status)
status_file.close()

pickle.dump(title, title_file)
# title_file.write(title)
title_file.close()

pickle.dump(address, address_file)
# address_file.write(address)
address_file.close()

pickle.dump(index, index_file)
# index_file.write(index)
index_file.close()

pickle.dump(content, content_file)
# content_file.write(content)
content_file.close()