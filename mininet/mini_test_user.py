from time import sleep
from mininet.cli import CLI
from mininet.log import lg, info
from mininet.topolib import TreeNet
from mininet.util import pmonitor

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

	p2 = h2.popen('node ../server/server.js %s & ' %h2.IP())
	p3 = h3.popen('node ../server/server.js %s & ' %h3.IP())
	sleep(2)
	
	
	# print(h1.cmd('python3 test_user.py 1 %s |& tee -a output.log &' %h2.IP()))

	# h4.cmd('python3 ../mininet/test_user.py 2 %s |& tee -a output.log &' %h2.IP())
	# h5.cmd('python3 ../mininet/test_user.py 3 %s |& tee -a output.log &' %h2.IP())
	# h8.cmd('python3 ../mininet/test_user.py 4 %s |& tee -a output.log &' %h2.IP())
	# h9.cmd('python3 ../mininet/test_user.py 5 %s |& tee -a output.log &' %h2.IP())
	# h10.cmd('python3 ../mininet/test_user.py 6 %s |& tee -a output.log &' %h2.IP())
	# h11.cmd('python3 ../mininet/test_user.py 7 %s |& tee -a output.log &' %h2.IP())
	
	# h6.cmd('python3 ../mininet/test_user.py 8 %s |& tee -a output.log &' %h3.IP())
	# h7.cmd('python3 ../mininet/test_user.py 9 %s |& tee -a output.log &' %h3.IP())
	# h12.cmd('python3 ../mininet/test_user.py 10 %s |& tee -a output.log &' %h3.IP())
	# h13.cmd('python3 ../mininet/test_user.py 11 %s |& tee -a output.log &' %h3.IP())
	# h14.cmd('python3 ../mininet/test_user.py 12 %s |& tee -a output.log &' %h3.IP())
	# h15.cmd('python3 ../mininet/test_user.py 13 %s |& tee -a output.log &' %h3.IP())
	
	# sleep(60)
	
	# h16.cmd('chmod 777 output.log')
	# with open('output.log', 'r') as fin:
	# 	print(fin.read())
	
	p1 = h1.popen('python3 ../mininet/test_user.py 1 %s &' %h2.IP())
	p4 = h4.popen('python3 ../mininet/test_user.py 2 %s &' %h2.IP())
	p5 = h5.popen('python3 ../mininet/test_user.py 3 %s &' %h2.IP())
	p6 = h8.popen('python3 ../mininet/test_user.py 4 %s &' %h2.IP())
	p7 = h9.popen('python3 ../mininet/test_user.py 5 %s &' %h2.IP())
	p8 = h10.popen('python3 ../mininet/test_user.py 6 %s &' %h2.IP())
	p9 = h11.popen('python3 ../mininet/test_user.py 7 %s &' %h2.IP())
	p10 = h6.popen('python3 ../mininet/test_user.py 8 %s &' %h3.IP())
	p11 = h7.popen('python3 ../mininet/test_user.py 9 %s &' %h3.IP())
	p12 = h12.popen('python3 ../mininet/test_user.py 10 %s &' %h3.IP())
	p13 = h13.popen('python3 ../mininet/test_user.py 11 %s &' %h3.IP())
	p14 = h14.popen('python3 ../mininet/test_user.py 12 %s &' %h3.IP())
	p15 = h15.popen('python3 ../mininet/test_user.py 13 %s &' %h3.IP())
	process = {h1:p1,h4:p4,h5:p5,h6:p6,h7:p7,h8:p8,h9:p9,h10:p10,h11:p11,h12:p12,h13:p13,h14:p14, h15:p15}
	# process = {h1:p1, h4:p4}
	
	
	for host, line in pmonitor( process ):
		if host:
			info( "<%s>: %s" % ( host.name, line ) )
		
    
    # Removing the log file after showing it on stdout
	# h16.cmd('sudo rm output.log')
	p1.terminate()
	p2.terminate()
	p3.terminate()
	p4.terminate()
	p5.terminate()
	p6.terminate()
	p7.terminate()
	p8.terminate()
	p9.terminate()
	p10.terminate()
	p11.terminate()
	p12.terminate()
	p13.terminate()
	p14.terminate()
	p15.terminate()
	net.stop()

if __name__ == "__main__":
	main()