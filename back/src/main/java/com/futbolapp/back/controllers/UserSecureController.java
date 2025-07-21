package com.futbolapp.back.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/secure")
public class UserSecureController {

    // Este endpoint está protegido, y solo accesible con un token válido
    @GetMapping("/user")
    public ResponseEntity<String> userInfo(Authentication authentication) {
        String firebaseUid = (String) authentication.getPrincipal();
        return ResponseEntity.ok("✅ Usuario autenticado con UID: " + firebaseUid);
    }

    // Endpoint público para probar que la app está corriendo
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("🔓 Endpoint público funcionando");
    }
}