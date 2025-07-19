package com.dl.runnable;

public class Eg4 {
	//In thread constructor adding lambda function
	public static void main(String[] args) {
		Thread thread = new Thread((()->{
			System.out.println("lambda function inside thread cons");
		}));
		thread.start();
	}
}
