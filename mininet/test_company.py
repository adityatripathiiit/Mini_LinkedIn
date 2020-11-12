import sys
import pexpect
count = sys.argv[1]

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

c = pexpect.spawn('node ../client/client.js', encoding='utf-8')
c.logfile_read = sys.stdout

from func_def import *

signUpCompany(companyName[count],description[count],address[count],email[count], password[count],c)
loginCompany(email[count], password[count],c)
getMyProfile(c)
feedCompany(c)
postJob(jobTitle[count],jobType[count],jobLocation[count],description[count],employmentType[count],industryType[count],experience[count],budget[count],skills[count],c)
viewProfileCompany(indexOfJob[count],indexOfApplicant[count] ,c)

logout(c)
endsession(c)


