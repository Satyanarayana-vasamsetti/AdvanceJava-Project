package com.dl.doublecolon;

public class Eg2 {
	public static void add() {
		int a = 10;
		int b = 20;
		System.out.println(a+b);
	}
	public static void main(String[] args) {
		//Normal way
		Eg2.add();
		
		//Method Reference
		//Classname::Staticmethod
		Thread t = new Thread(Eg2::add);
		t.start();
		
		//Lambda approach
		Thread t2 = new Thread(()->add());
		t2.start(); 
;		
	}
}
