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

email_file = open("./workload_company/emails.txt", "wb")
password_file = open("./workload_company/password.txt", "wb")
description_file = open("./workload_company/description.txt", "wb")
companyName_file = open("./workload_company/companyName.txt", "wb")
jobLocation_file = open("./workload_company/jobLocation.txt", "wb")
jobTitle_file = open("./workload_company/jobTitle.txt", "wb")
jobType_file = open("./workload_company/jobType.txt", "wb")
employmentType_file = open("./workload_company/employmentType.txt", "wb")
industryType_file = open("./workload_company/industryType.txt", "wb")
experience_file = open("./workload_company/experience.txt", "wb")
budget_file = open("./workload_company/budget.txt", "wb")
skills_file = open("./workload_company/skills.txt", "wb")
address_file = open("./workload_company/address.txt", "wb")
index_file = open("./workload_company/index.txt", "wb")
indexOfApplicant_file = open("./workload_company/indexOfApplicant.txt", "wb")
indexOfJob_file = open("./workload_company/indexOfJob.txt", "wb")

email = []
password = []
description = []
companyName = []
jobLocation = []
jobTitle = []
jobType = []
employmentType = []
industryType = []
experience = []
budget = []
skills = []
address = []
index = []
indexOfApplicant = []
indexOfJob = []



for i in range(MAX_USERS):
    email.append(random_char(7)+"@gmail.com")
    password.append(get_random_string(8))
    text = fake.text().replace("\n",'')
    description.append(text)
    companyName.append(names.get_first_name())
    jobLocation.append(random.choice(["Gurgaon", "Seattle","New York", "Bangalore", "Mumbai","Sydney", "San-Fransisco"]))
    jobTitle.append(random.choice(["Software Enginner", "Designer","Network Engineer", "Cleaner", "Team Lead","Product Manager", "Reception"]))
    jobType.append(random.choice(["SDE", "Network", "Design", "Product"]))
    employmentType.append(random.choice(["Intern", "Full Time","Casual","Fixed Term"]))
    industryType.append(random.choice(["Software", "Hardware", "Textile", "Finance", "Bussiness"]))
    experience.append(random.randint(0,10))
    budget.append(str(random.randint(10,20))+ "LPA")
    skills.append(random.choice(["SDN","DCN","Full_Stack","Network_Programming", "Mininet","Telnet","Scappy","Python", "JS", "Cpp", "DSA"]))
    temp = fake.address().replace("\n",'')
    address.append(temp)
    index.append(random.randint(0,10))
    indexOfApplicant.append(random.randint(0,10))
    indexOfJob.append(random.randint(0,10))



pickle.dump(email, email_file)
email_file.close()

pickle.dump(companyName, companyName_file)
companyName_file.close()

pickle.dump(password, password_file)
password_file.close()

pickle.dump(description, description_file)
# status_file.write(status)
description_file.close()

pickle.dump(jobLocation, jobLocation_file)
# title_file.write(title)
jobLocation_file.close()

pickle.dump(address, address_file)
# address_file.write(address)
address_file.close()

pickle.dump(index, index_file)
# index_file.write(index)
index_file.close()

pickle.dump(jobTitle, jobTitle_file)
# content_file.write(content)
jobTitle_file.close()

pickle.dump(jobType, jobType_file)
# content_file.write(content)
jobType_file.close()

pickle.dump(employmentType, employmentType_file)
# content_file.write(content)
employmentType_file.close()

pickle.dump(industryType, industryType_file)
# content_file.write(content)
industryType_file.close()

pickle.dump(experience, experience_file)
# content_file.write(content)
experience_file.close()

pickle.dump(budget, budget_file)
# content_file.write(content)
budget_file.close()

pickle.dump(skills, skills_file)
# content_file.write(content)
skills_file.close()

pickle.dump(indexOfApplicant, indexOfApplicant_file)
# content_file.write(content)
indexOfApplicant_file.close()

pickle.dump(indexOfJob, indexOfJob_file)
# content_file.write(content)
indexOfJob_file.close()
