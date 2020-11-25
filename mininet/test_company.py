import sys
import pexpect
import pickle
from time import sleep
count = int(sys.argv[1])
IP = sys.argv[2]
command = "node ../client/client.js " + IP

companyName = []
email = []
password = []
address = []
description = []
jobLocation = []
jobTitle = []
jobType = []
employmentType = []
industryType = []
experience = []
budget = []
skills = []
indexOfApplicant = []
indexOfJob = []

with open ('./workload_company/address.txt', 'rb') as fp:
    address = pickle.load(fp)
with open ('./workload_company/companyName.txt', 'rb') as fp:
    companyName = pickle.load(fp)
with open ('./workload_company/emails.txt', 'rb') as fp:
    email = pickle.load(fp)
with open ('./workload_company/password.txt', 'rb') as fp:
    password = pickle.load(fp)
with open ('./workload_company/description.txt', 'rb') as fp:
    description = pickle.load(fp)
with open ('./workload_company/jobLocation.txt', 'rb') as fp:
    jobLocation = pickle.load(fp)
with open ('./workload_company/index.txt', 'rb') as fp:
    index = pickle.load(fp)
with open ('./workload_company/jobTitle.txt', 'rb') as fp:
    jobTitle = pickle.load(fp)
with open ('./workload_company/jobType.txt', 'rb') as fp:
    jobType = pickle.load(fp)
with open ('./workload_company/employmentType.txt', 'rb') as fp:
    employmentType = pickle.load(fp)
with open ('./workload_company/industryType.txt', 'rb') as fp:
    industryType = pickle.load(fp)
with open ('./workload_company/experience.txt', 'rb') as fp:
    experience = pickle.load(fp)
with open ('./workload_company/budget.txt', 'rb') as fp:
    budget = pickle.load(fp)
with open ('./workload_company/skills.txt', 'rb') as fp:
    skills = pickle.load(fp)
with open ('./workload_company/indexOfApplicant.txt', 'rb') as fp:
    indexOfApplicant = pickle.load(fp)
with open ('./workload_company/indexOfJob.txt', 'rb') as fp:
    indexOfJob = pickle.load(fp)

c = pexpect.spawn(command, encoding='utf-8')
c.logfile_read = sys.stdout

from func_def import *

signUpCompany(companyName[count],description[count],address[count],email[count], password[count],c)
sleep(1)
login(email[count], password[count],c)
sleep(0.5)
postJob(jobTitle[count],jobType[count],jobLocation[count],description[count],employmentType[count],industryType[count],str(experience[count]),budget[count],skills[count],c)
sleep(0.5)
getMyProfile(c)
sleep(0.5)
feedCompany(c)
sleep(0.5)
viewProfileCompany(str(indexOfJob[count]),str(indexOfApplicant[count]) ,c)
sleep(10)
logout(c)
sleep(1)
endsession(c)


