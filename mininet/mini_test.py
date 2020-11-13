from time import sleep
from mininet.cli import CLI
from mininet.log import lg, info
from mininet.topolib import TreeNet

def main():
	lg.setLogLevel( 'info')
	net = TreeNet( depth=1, fanout=4 )
	# Add NAT connectivity
	net.addNAT().configDefault()
	net.start()

	h1 = net.get('h1')
	h2 = net.get('h2')
	p1 = h1.popen('node ../server/server.js &' )
	sleep(2)
	print(h2.cmd('python3 ../mininet/test_user.py 1'))
	CLI( net )
	p1.terminate()
	net.stop()

main()