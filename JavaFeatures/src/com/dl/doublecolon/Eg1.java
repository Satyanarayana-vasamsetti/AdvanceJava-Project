package com.dl.doublecolon;

import java.util.ArrayList;
import java.util.Iterator;

public class Eg1 {
	public static void main(String[] args) {
		ArrayList<String> arr = new ArrayList<>();
		arr.add("admin1");
		arr.add("admin2");
		arr.add("admin3");
		arr.add("admin4");
		arr.add("admin5");
		
		System.out.println(arr);
		
		//lambda approach
		arr.forEach(s->System.out.println(s));
		
		//using double colon
		arr.forEach(System.out::println);
		
		//using cursor
		Iterator<String> it = arr.iterator();
		while(it.hasNext()) {
			System.out.println(it.next());
		}
	}
}
