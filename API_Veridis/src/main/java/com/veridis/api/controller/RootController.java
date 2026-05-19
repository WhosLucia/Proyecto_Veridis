package com.veridis.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/api")
    public String inicio() {
        return "API de Véridis funcionando";
    }
}
