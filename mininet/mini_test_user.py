from time import sleep
from mininet.cli import CLI
from mininet.log import lg, info
from mininet.topolib import TreeNet
from mininet.util import pmonitor

def printToConsole(process):
	for host, line in pmonitor( process):
		if host:
			info( "<%s>: %s" % ( host.name, line ) )

def main():
	lg.setLogLevel( 'info')
	net = TreeNet( depth=2, fanout=4)
	# Add NAT connectivity
	net.addNAT().configDefault()
	net.start()

	h1 = net.get('h1')
	h2 = net.get('h2')
	h3 = net.get('h3')
	h4 = net.get('h4')
	h5 = net.get('h5')
	h6 = net.get('h6')
	h7 = net.get('h7')
	h8 = net.get('h8')
	h9 = net.get('h9')
	h10 = net.get('h10')
	h11 = net.get('h11')
	h12 = net.get('h12')
	h13 = net.get('h13')
	h14 = net.get('h14')
	h15 = net.get('h15')
	h16 = net.get('h16')

	p1 = h1.popen('node ../server/server.js %s & ' %h1.IP())
	p16 = h16.popen('node ../server/server.js %s & ' %h16.IP())
	sleep(2)

	p2 = h2.popen('python3 ../mininet/test_user.py 1 %s &' %h1.IP())
	p3 = h3.popen('python3 ../mininet/test_user.py 2 %s &' %h1.IP())
	p4 = h4.popen('python3 ../mininet/test_user.py 3 %s &' %h1.IP())
	p5 = h5.popen('python3 ../mininet/test_user.py 4 %s &' %h1.IP())
	p6 = h6.popen('python3 ../mininet/test_user.py 5 %s &' %h16.IP())
	p7 = h7.popen('python3 ../mininet/test_user.py 6 %s &' %h16.IP())
	p8 = h8.popen('python3 ../mininet/test_user.py 7 %s &' %h1.IP())
	p9 = h9.popen('python3 ../mininet/test_user.py 8 %s &' %h1.IP())
	p10 = h10.popen('python3 ../mininet/test_user.py 9 %s &' %h1.IP())
	p11 = h11.popen('python3 ../mininet/test_user.py 10 %s &' %h16.IP())
	p12 = h12.popen('python3 ../mininet/test_user.py 11 %s &' %h16.IP())
	p13 = h13.popen('python3 ../mininet/test_user.py 12 %s &' %h16.IP())
	p14 = h14.popen('python3 ../mininet/test_user.py 13 %s &' %h16.IP())
	p15 = h15.popen('python3 ../mininet/test_user.py 14 %s &' %h16.IP())
	
	

	process2 = {h2:p2}
	process3 = {h3:p3}
	process4 = {h4:p4}
	process5 = {h5:p5}
	process6 = {h6:p6}
	process7 = {h7:p7}
	process8 = {h8:p8}
	process9 = {h9:p9}
	process10 = {h10:p10}
	process11 = {h11:p11}
	process12 = {h12:p12}
	process13 = {h13:p13}
	process14 = {h14:p14}
	process15 = {h15:p15}

	printToConsole(process2)
	p2.terminate()
	
	printToConsole(process3)
	p3.terminate()
	
	printToConsole(process4)
	p4.terminate()
	
	printToConsole(process5)
	p5.terminate()
	
	printToConsole(process6)
	p6.terminate()
	
	printToConsole(process7)
	p7.terminate()
	
	printToConsole(process8)
	p8.terminate()
	
	printToConsole(process9)
	p9.terminate()
	
	printToConsole(process10)
	p10.terminate()
	
	printToConsole(process11)
	p11.terminate()
	
	printToConsole(process12)
	p12.terminate()
	
	printToConsole(process13)
	p13.terminate()
	
	printToConsole(process14)
	p14.terminate()

	printToConsole(process15)
	p15.terminate()
	
	p1.terminate()
	p16.terminate()
	net.stop()

if __name__ == "__main__":
	main()