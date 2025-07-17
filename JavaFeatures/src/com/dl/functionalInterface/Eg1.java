package com.dl.functionalInterface;

public class Eg1 {
	static int x =1;
	int y = 2;
	public static void main(String[] args) {
		int a = 10;
		int b = 20;
		
		System.out.println("LV : "+a);
		System.out.println("LV : "+b);
		System.out.println("Static V : "+x);
		System.out.println("Instance V : "+new Eg1().y);
	}
}
