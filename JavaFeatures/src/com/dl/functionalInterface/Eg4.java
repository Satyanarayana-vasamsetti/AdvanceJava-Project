package com.dl.functionalInterface;

@FunctionalInterface
interface in{
	void vo();
}

public class Eg4 {
	int a;
	int b;
	public Eg4(int a, int b) {
		super();
		this.a = a;
		this.b = b;
	}
	public static void main(String[] args) {
		new Eg4(1,2).vo();
	}
	
	public void vo() {
		in n = ()->System.out.println(a+b);
		n.vo();
	}
}
