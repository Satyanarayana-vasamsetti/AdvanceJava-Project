package com.dl.runnable;

class A implements Runnable{

	@Override
	public void run() {
		System.out.println("Run method");
		
	}
	
}
public class Eg1 {
	public static void main(String[] args) {
		A a = new A();
		Thread thread = new Thread(a);
		thread.start();
	}
}
