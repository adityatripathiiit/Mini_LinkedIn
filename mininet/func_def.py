def endsession(c):
    c.expect("prompt:")
    c.sendline("0")

def login(email, password,c):
    c.expect("prompt:")
    c.sendline("1")

    c.expect("prompt:")
    c.sendline(email)

    c.expect("prompt:")
    c.sendline(password)  

def loginCompany(email, password,c):
    c.expect("prompt:")
    c.sendline("2")

    c.expect("prompt:")
    c.sendline(email)

    c.expect("prompt:")
    c.sendline(password)  

def signUpUser(firstName,lastName,email, password,c):
    c.expect("prompt:")
    c.sendline("3")

    c.expect("prompt:")
    c.sendline(firstName)

    c.expect("prompt:")
    c.sendline(lastName) 
    
    c.expect("prompt:")
    c.sendline(email) 

    c.expect("prompt:")
    c.sendline(password) 

def signUpCompany(companyName,description,address,email, password,c):
    c.expect("prompt:")
    c.sendline("4")

    c.expect("prompt:")
    c.sendline(companyName)

    c.expect("prompt:")
    c.sendline(description)

    c.expect("prompt:")
    c.sendline(address)  
    
    c.expect("prompt:")
    c.sendline(email) 

    c.expect("prompt:")
    c.sendline(password)

def logout(c):
    c.expect("prompt:")
    c.sendline("5")

def getMyProfile(c):
    c.expect("prompt:")
    c.sendline("6")

def updateProfileUser(status, title,address,c):
    c.expect("prompt:")
    c.sendline("7")

    c.expect("prompt:")
    c.sendline(status)

    c.expect("prompt:")
    c.sendline(title) 

    c.expect("prompt:")
    c.sendline(address) 
    
def deleteAccount(c):
    c.expect("prompt:")
    c.sendline("8")
    
def getMyFeed(c):
    c.expect("prompt:")
    c.sendline("9")

def like(index,c):
    c.expect("prompt:")
    c.sendline("10")

    c.expect("prompt:")
    c.sendline(index)

def clap(index,c):
    c.expect("prompt:")
    c.sendline("11")

    c.expect("prompt:")
    c.sendline(index)

def support(index,c):
    c.expect("prompt:")
    c.sendline("12")

    c.expect("prompt:")
    c.sendline(index)

def acceptConnection(index,c):
    c.expect("prompt:")
    c.sendline("13")

    c.expect("prompt:")
    c.sendline(index)

def sendConnection(index,c):
    c.expect("prompt:")
    c.sendline("14")

    c.expect("prompt:")
    c.sendline(index)

def postJob(jobTitle,jobType,jobLocation,description,employmentType,industryType,experience,budget,skills,c):
    c.expect("prompt:")
    c.sendline("15")

    c.expect("prompt:")
    c.sendline(jobTitle)

    c.expect("prompt:")
    c.sendline(jobType)

    c.expect("prompt:")
    c.sendline(jobLocation)
    
    c.expect("prompt:")
    c.sendline(description)

    c.expect("prompt:")
    c.sendline(employmentType)

    c.expect("prompt:")
    c.sendline(industryType)

    c.expect("prompt:")
    c.sendline(experience)

    c.expect("prompt:")
    c.sendline(budget)

    c.expect("prompt:")
    c.sendline(skills)

def createPost(content,c):
    c.expect("prompt:")
    c.sendline("16")

    c.expect("prompt:")
    c.sendline(content)
    
def searchJob(skills, c):
    c.expect("prompt:")
    c.sendline("17")

    c.expect("prompt:")
    c.sendline(skill)

def feedCompany(c):
    c.expect("prompt:")
    c.sendline("18")

def endorseSkill(c):
    c.expect("prompt:")
    c.sendline("19")

def applyToJob(index,c):
    c.expect("prompt:")
    c.sendline("20")
    c.expect("prompt:")
    c.sendline("index")
    

def viewProfileUser(index,c):
    c.expect("prompt:")
    c.sendline("21")
    c.expect("prompt:")
    c.sendline("index")

def viewProfileCompany(indexOfJob,indexOfApplicant ,c):
    c.expect("prompt:")
    c.sendline("22")
    c.expect("prompt:")
    c.sendline("indexOfJob")
    c.expect("prompt:")
    c.sendline("indexOfApplicant")





