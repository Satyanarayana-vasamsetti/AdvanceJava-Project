package com.dl.functionalInterface;

//Normal Interface with multiple methods
interface hello{
	void hell0();
	void nothello();
}

@FunctionalInterface
interface hello1{
	void sum();
}
public class Eg2 implements hello1{
	static int x =1;
	int y = 2;
	public static void main(String[] args) {
		new Eg2().sum(); 
		
	}
	public void sum() {
		int a = 10;
		int b = 20;
		
		System.out.println("LV : "+a);
		System.out.println("LV : "+b);
		System.out.println("Static V : "+x);
		System.out.println("Instance V : "+new Eg2().y);
	}
}
