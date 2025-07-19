package com.dl.doublecolon;

public class Eg3 {
	private void add() {
		int a = 10;
		int b = 20;
		System.out.println(a+b);
	}
	public static void main(String[] args) {
		//Normal way
		new Eg3().add();
		
		//Method Reference
		//Classname::Staticmethod
		Thread t = new Thread(new Eg3()::add);
		t.start();
		
		//Lambda approach
		Eg3 eg3 = new Eg3();
		Thread t2 = new Thread(()->eg3.add());
		t2.start(); 
;		
	}
}
