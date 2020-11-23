import sys
import pexpect
import pickle
from time import sleep
count = int(sys.argv[1])
IP = sys.argv[2]
command = "node ../client/client.js " + IP

firstName = []
lastName = []
email = []
password = []
status = []
title = []
address = []
index = []
content = []
indexOfSkills = []
indexOfUser = []
skills = []

with open ('./workload_user/address.txt', 'rb') as fp:
    address = pickle.load(fp)
with open ('./workload_user/fnames.txt', 'rb') as fp:
    firstName = pickle.load(fp)
with open ('./workload_user/emails.txt', 'rb') as fp:
    email = pickle.load(fp)
with open ('./workload_user/lnames.txt', 'rb') as fp:
    lastName = pickle.load(fp)
with open ('./workload_user/password.txt', 'rb') as fp:
    password = pickle.load(fp)
with open ('./workload_user/title.txt', 'rb') as fp:
    title = pickle.load(fp)
with open ('./workload_user/status.txt', 'rb') as fp:
    status = pickle.load(fp)
with open ('./workload_user/viewUserIndex.txt', 'rb') as fp:
    indexOfUser = pickle.load(fp)
with open ('./workload_user/content.txt', 'rb') as fp:
    content = pickle.load(fp)
with open ('./workload_user/indexOfUser.txt', 'rb') as fp:
    index = pickle.load(fp)
with open ('./workload_user/indexOfJobs.txt', 'rb') as fp:
    indexOfSkills = pickle.load(fp)
with open ('./workload_user/skills.txt', 'rb') as fp:
    skills = pickle.load(fp)


c = pexpect.spawn(command, encoding='utf-8')
c.logfile_read = sys.stdout

from func_def import *


signUpUser(firstName[count],lastName[count],email[count], password[count],c)

sleep(1)
login(email[count], password[count],c)

sleep(0.5)  
like(str(index[count]),c)

sleep(0.5)
clap(str(index[count]),c)

sleep(0.5)
support(str(index[count]),c)


sleep(0.5)
updateProfileUser(status[count], title[count],address[count], skills[count],c)

sleep(2)
getMyProfile(c)

sleep(0.5)
acceptConnection(str(index[count]),c)

sleep(1)
sendConnection(str(index[count]),c)

sleep(1)
createPost(content[count],c)

sleep(2)
getMyFeed(c)  

sleep(0.5)
searchJob(str(index[count]), c)

sleep(2)
endorseSkill(str(indexOfUser[count]), str(indexOfSkills[count]),c)
sleep(2)

applyToJob(str(index[count]),c)
sleep(5)

viewProfileUser(str(index[count]),c)
sleep(10)

logout(c)
sleep(2)
endsession(c)


