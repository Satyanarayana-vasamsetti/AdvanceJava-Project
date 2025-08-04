package com.dl.security.service;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
	
	private String secretkey = "";
	
	public JWTService() throws NoSuchAlgorithmException {
		KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
		SecretKey sk = keyGen.generateKey();
		secretkey = Base64.getEncoder().encodeToString(sk.getEncoded());
	}

	public String generateToken(String username) {
		Map<String, Object> claims = new HashMap<>();
		return Jwts.builder()
				.claims()
				.add(claims)
				.subject(username)
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 60*60*30))
				.and()
				.signWith(getKey())
				.compact();
	}

	private Key getKey() {
		byte[] keybytes = Decoders.BASE64.decode(secretkey);
		return Keys.hmacShaKeyFor(keybytes);
	}

}
