package com.futbolapp.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // 🔓 Public endpoints (no credentials)
                registry.addMapping("/api/public/**")
                        .allowedOriginPatterns("*") // ✔ safe now
                        .allowedMethods("GET", "POST")
                        .allowedHeaders("*")
                        .allowCredentials(false); // ✔ no credentials

                // 🔐 Protected endpoints (require credentials)
                registry.addMapping("/api/**")
                        .allowedOrigins("https://futpool.netlify.app", "http://localhost:3000")
                        .allowedOriginPatterns(
                            "https://*.netlify.app",
                            "http://localhost:*"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // ✔ secure access
            }
        };
    }
}
