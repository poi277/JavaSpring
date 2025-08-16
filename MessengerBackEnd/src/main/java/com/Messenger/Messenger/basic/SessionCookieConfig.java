package com.Messenger.Messenger.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieHttpSessionIdResolver;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
	
@Configuration
public class SessionCookieConfig {

	// 세션 쿠키 설정
	@Bean
	public CookieSerializer cookieSerializer() {
		DefaultCookieSerializer serializer = new DefaultCookieSerializer();
		serializer.setCookieName("SESSION");
		serializer.setUseHttpOnlyCookie(true);
		serializer.setUseSecureCookie(false); // 로컬 HTTP 테스트 시 false, HTTPS에서는 true
		serializer.setCookieMaxAge(-1); // 브라우저 종료 시 삭제

		return serializer;
	}

	@Bean
	public CookieHttpSessionIdResolver httpSessionIdResolver() {
		CookieHttpSessionIdResolver resolver = new CookieHttpSessionIdResolver();
		resolver.setCookieSerializer(cookieSerializer());
		return resolver;
	}

}

