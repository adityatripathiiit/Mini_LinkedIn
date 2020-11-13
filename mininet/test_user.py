import sys
import pexpect
import pickle
count = int(sys.argv[1])
print(count)

firstName = []
lastName = []
email = []
password = []
status = []
title = []
address = []
index = []
content = []


with open ('./workload/address.txt', 'rb') as fp:
    address = pickle.load(fp)
with open ('./workload/fnames.txt', 'rb') as fp:
    firstName = pickle.load(fp)
with open ('./workload/emails.txt', 'rb') as fp:
    email = pickle.load(fp)
with open ('./workload/lnames.txt', 'rb') as fp:
    lastName = pickle.load(fp)
with open ('./workload/password.txt', 'rb') as fp:
    password = pickle.load(fp)
with open ('./workload/title.txt', 'rb') as fp:
    title = pickle.load(fp)
with open ('./workload/status.txt', 'rb') as fp:
    status = pickle.load(fp)
with open ('./workload/index.txt', 'rb') as fp:
    index = pickle.load(fp)
with open ('./workload/content.txt', 'rb') as fp:
    content = pickle.load(fp)

# print(firstName)
# print(lastName)
# print(email)
# print(password)
# print(status)
# print(title)
# print(address)
# print(index)
# print(content)


c = pexpect.spawn('node ../client/client.js', encoding='utf-8')
c.logfile_read = sys.stdout

from func_def import *

signUpUser(firstName[count],lastName[count],email[count], password[count],c)
login(email[count], password[count],c)
# # signUpCompany(companyName[count],description[count],address[count],email[count], password[count],c)
# # loginCompany(email[count], password[count],c)
getMyProfile(c)
# updateProfileUser(status[count], title[count],address[count],c)
getMyFeed(c)
# # like(index[count],c)
# # clap(index[count],c)
# # support(index[count],c)
# # acceptConnection(index[count],c)
# # sendConnection(index[count],c)
# createPost(content[count],c)
# # searchJob(skills[count], c)
# # endorseSkill(c)
# # applyToJob(index[count],c)
# # viewProfileUser(index[count],c)

logout(c)
endsession(c)


