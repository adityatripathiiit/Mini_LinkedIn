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

email_file = open("./workload_user/emails.txt", "wb")
first_name_file = open("./workload_user/fnames.txt", "wb")
last_name_file = open("./workload_user/lnames.txt", "wb")
password_file = open("./workload_user/password.txt", "wb")
status_file = open("./workload_user/status.txt", "wb")
title_file = open("./workload_user/title.txt", "wb")
address_file = open("./workload_user/address.txt", "wb")
indexOfUser_file = open("./workload_user/indexOfUser.txt", "wb")
content_file = open("./workload_user/content.txt", "wb")
skills_file = open("./workload_user/skills.txt", "wb")
indexOfJobs_file = open("./workload_user/indexOfJobs.txt", "wb")
viewUserIndex_file = open("./workload_user/viewUserIndex.txt", "wb")


email = []
fname = []
lname = []
password = []
status = []
title = []
address = []
indexOfUser = []
content = []
indexOfJobs = []
viewUserIndex = []
skills = []


for i in range(MAX_USERS):
    email.append(random_char(7)+"@gmail.com")
    fname.append(names.get_first_name())
    lname.append(names.get_last_name())
    password.append(get_random_string(8))
    status.append(get_random_string(10))
    title.append("This is "+ str(i)+ "th user on MiniLinkedIn")
    add = fake.address().replace("\n",'')
    address.append(add)
    indexOfUser.append(random.randint(0,10))
    temp = fake.text().replace("\n",'')
    content.append(temp)
    indexOfJobs.append(random.randint(0,10))
    skills.append(random.choice(["SDN","DCN","Full_Stack","Network_Programming", "Mininet","Telnet","Scappy","Python", "JS", "Cpp", "DSA"]))
    viewUserIndex.append(random.randint(0,10))

print(skills)
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

pickle.dump(indexOfUser, indexOfUser_file)
# index_file.write(index)
indexOfUser_file.close()

pickle.dump(content, content_file)
# content_file.write(content)
content_file.close()

pickle.dump(skills, skills_file)
skills_file.close()
pickle.dump(indexOfJobs, indexOfJobs_file)
indexOfJobs_file.close()
pickle.dump(viewUserIndex, viewUserIndex_file)
viewUserIndex_file.close()