package com.dl.runnable;

public class Eg3 {
	public static void main(String[] args) {
		//Thread constructor adding runnable object
		Thread thread = new Thread(new Runnable() {
			
			@Override
			public void run() {
				System.out.println("Thread run method");
				
			}
		});
		thread.start();
	}
}
