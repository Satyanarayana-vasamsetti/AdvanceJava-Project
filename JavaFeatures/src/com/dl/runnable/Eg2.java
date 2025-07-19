package com.dl.runnable;

public class Eg2 {
	public static void main(String[] args) {
		//Runnable interface using lambda expression
		Runnable r = () ->{
			System.out.println("Run method");
		};
		Thread thread = new Thread(r);
		thread.start();
	}
}
