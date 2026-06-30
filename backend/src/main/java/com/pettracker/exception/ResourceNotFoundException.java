package com.pettracker.exception;

// ─────────────────────────────────────────────
// ResourceNotFoundException.java
// ─────────────────────────────────────────────
// (Save this as its own file in the exception package)

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
