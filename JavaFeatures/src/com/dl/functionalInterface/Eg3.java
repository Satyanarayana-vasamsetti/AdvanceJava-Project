package com.dl.functionalInterface;

@FunctionalInterface
interface sum{
	void sum1(int a,int b);
	
}
public class Eg3{
	public static void main(String[] args) {
		sum s = (x,y) -> System.out.println("Sum : "+(x+y));
		s.sum1(10, 40);
	}

	
}
